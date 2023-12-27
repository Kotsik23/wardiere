import { httpAction } from "./_generated/server"
import { internal } from "./_generated/api"
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
				console.log(event.data)
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
				console.log(event.data)
				break
			}
			case "user.deleted": {
				console.log(event.data)
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
