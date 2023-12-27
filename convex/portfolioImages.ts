import { action, internalMutation, internalQuery, query } from "./_generated/server"
import { portfolioImageFields } from "./schema"
import { ConvexError, v } from "convex/values"
import { api, internal } from "./_generated/api"

export const upload = action({
	args: {
		authorId: v.id("authors"),
		categoryId: v.id("categories"),
		arrayBuffer: v.bytes(),
	},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity()
		if (!identity) {
			throw new ConvexError("Unauthenticated")
		}
		const uploadedImage = await ctx.runAction(internal.imageKit.upload, {
			arrayBuffer: args.arrayBuffer,
		})
		const imageId = await ctx.runMutation(internal.image.create, {
			fileId: uploadedImage.fileId,
			url: uploadedImage.url,
		})
		const portfolioImage = await ctx.runMutation(internal.portfolioImages.create, {
			authorId: args.authorId,
			imageId,
			categoryId: args.categoryId,
		})
		const author = await ctx.runQuery(api.authors.getById, { authorId: args.authorId })
		if (!author) {
			throw new ConvexError("Author not found")
		}
		await ctx.runMutation(api.authors.update, {
			authorId: args.authorId,
			payload: { portfolioImages: [...author.portfolioImages, portfolioImage] },
		})
	},
})

export const deleteImage = action({
	args: {
		authorId: v.id("authors"),
		portfolioImageId: v.id("portfolioImages"),
	},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity()
		if (!identity) {
			throw new ConvexError("Unauthenticated")
		}
		const portfolioImage = await ctx.runQuery(api.portfolioImages.getById, {
			portfolioImageId: args.portfolioImageId,
		})
		if (!portfolioImage) {
			throw new ConvexError("Portfolio image not found")
		}
		const image = await ctx.runQuery(api.image.getById, { imageId: portfolioImage.imageId })
		if (!image) {
			throw new ConvexError("Image not found")
		}
		await ctx.runAction(internal.imageKit.remove, { fileId: image.fileId })
		await ctx.runMutation(internal.image.remove, { imageId: image._id })
		await ctx.runMutation(internal.portfolioImages.remove, {
			portfolioImageId: args.portfolioImageId,
		})

		const author = await ctx.runQuery(api.authors.getById, { authorId: args.authorId })
		if (!author) {
			throw new ConvexError("Author not found")
		}
		await ctx.runMutation(api.authors.update, {
			authorId: args.authorId,
			payload: {
				portfolioImages: author.portfolioImages.filter(v => v !== portfolioImage._id),
			},
		})
	},
})

export const getById = query({
	args: {
		portfolioImageId: v.id("portfolioImages"),
	},
	handler: (ctx, args) => {
		return ctx.db.get(args.portfolioImageId)
	},
})

export const create = internalMutation({
	args: portfolioImageFields,
	handler: async (ctx, args) => {
		return ctx.db.insert("portfolioImages", args)
	},
})

export const remove = internalMutation({
	args: {
		portfolioImageId: v.id("portfolioImages"),
	},
	handler: async (ctx, args) => {
		return ctx.db.delete(args.portfolioImageId)
	},
})
