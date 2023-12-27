import { httpAction } from "./_generated/server"
import { api, internal } from "./_generated/api"
import { ClerkUser, ClerkWebhook } from "./types"

export const handleClerkWebhook = httpAction(async (ctx, req) => {
	const payload = await req.text()

	const svixId = req.headers.get("svix-id") ?? ""
	const svixSignature = req.headers.get("svix-signature") ?? ""
	const svixTimestamp = req.headers.get("svix-timestamp") ?? ""

	try {
		const event = (await ctx.runAction(internal.validate.clerkWebhook, {
			payload,
			headers: {
				svixId,
				svixSignature,
				svixTimestamp,
			},
		})) as ClerkWebhook<ClerkUser>

		switch (event.type) {
			case "user.created": {
				const { id, email_addresses, first_name, last_name, username, image_url } = event.data
				await ctx.runMutation(internal.user.create, {
					clerk_id: id,
					username,
					email_addresses: email_addresses.map(address => ({
						email_address: address.email_address,
					})),
					first_name,
					last_name,
					image_url,
				})
				break
			}
			case "user.updated": {
				const { id, email_addresses, first_name, last_name, username, image_url } = event.data
				await ctx.runMutation(internal.user.update, {
					clerk_id: id,
					username,
					email_addresses: email_addresses.map(address => ({
						email_address: address.email_address,
					})),
					first_name,
					last_name,
					image_url,
				})
				break
			}
			case "user.deleted": {
				const { id } = event.data
				const userAuthor = await ctx.runQuery(api.authors.getByUserId, { userId: id })
				if (!userAuthor) {
					throw Error(`Error Clerk webhook event ${event.type}. Author doesn't exists`)
				}
				await ctx.runMutation(internal.comments.removeAllByUserId, {
					userId: id,
				})
				await Promise.all(
					userAuthor.portfolioImages.map(imageId =>
						ctx.runMutation(internal.portfolioImages.remove, { portfolioImageId: imageId })
					)
				)
				if (userAuthor.photo) {
					const image = await ctx.runQuery(api.image.getById, { imageId: userAuthor.photo })
					if (!image) {
						throw Error(
							`Error Clerk webhook event ${event.type}. Author photo doesn't exists`
						)
					}
					await ctx.runAction(internal.imageKit.remove, { fileId: image.fileId })
					await ctx.runMutation(internal.image.remove, { imageId: image._id })
				}
				await ctx.runMutation(internal.authors.remove, { authorId: userAuthor._id })
				await ctx.runMutation(internal.user.remove, {
					clerk_id: id,
				})
				break
			}
			default: {
				console.log("ignored Clerk webhook event", event.type)
			}
		}

		return new Response(null, { status: 200 })
	} catch (error) {
		return new Response((error as Error).message, { status: 422 })
	}
})
