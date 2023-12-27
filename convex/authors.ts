import { action, internalMutation, mutation, query } from "./_generated/server"
import { paginationOptsValidator } from "convex/server"
import { ConvexError, v } from "convex/values"
import { authorFields } from "./schema"
import { api, internal } from "./_generated/api"

export const getAll = query({
	args: {
		paginationOpts: paginationOptsValidator,
	},
	handler: async (ctx, args) => {
		return await ctx.db
			.query("authors")
			.filter(q => q.neq(q.field("isPublic"), false))
			.order("desc")
			.paginate(args.paginationOpts)
	},
})

export const getById = query({
	args: {
		authorId: v.id("authors"),
	},
	handler: (ctx, args) => {
		return ctx.db.get(args.authorId)
	},
})

export const getByUserId = query({
	args: {
		userId: authorFields.userId,
	},
	handler: (ctx, args) => {
		return ctx.db
			.query("authors")
			.withIndex("by_userId")
			.filter(q => q.eq(q.field("userId"), args.userId))
			.unique()
	},
})

export const create = mutation({
	args: {
		userId: authorFields.userId,
	},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity()
		if (!identity) {
			throw new ConvexError("Unauthenticated")
		}
		return ctx.db.insert("authors", {
			userId: args.userId,
			isPublic: false,
			portfolioImages: [],
			likes: [],
			keywords: [],
			comments: [],
		})
	},
})

export const update = mutation({
	args: {
		authorId: v.id("authors"),
		payload: v.object({
			brand: v.optional(v.string()),
			aboutText: v.optional(v.string()),
			photo: v.optional(v.id("images")),
			portfolioImages: v.optional(v.array(v.id("portfolioImages"))),
			keywords: v.optional(v.array(v.string())),
			likes: v.optional(v.array(v.string())),
			contacts: v.optional(
				v.object({
					email: v.optional(v.string()),
				})
			),
		}),
	},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity()
		if (!identity) {
			throw new ConvexError("Unauthenticated")
		}
		return ctx.db.patch(args.authorId, args.payload)
	},
})

export const remove = internalMutation({
	args: {
		authorId: v.id("authors"),
	},
	handler: async (ctx, args) => {
		return ctx.db.delete(args.authorId)
	},
})

export const togglePublic = mutation({
	args: {
		authorId: v.id("authors"),
	},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity()
		if (!identity) {
			throw new ConvexError("Unauthenticated")
		}
		const author = await ctx.db.get(args.authorId)
		if (!author) {
			throw new ConvexError("Author doesn't exists")
		}
		return ctx.db.patch(args.authorId, {
			isPublic: !author.isPublic,
		})
	},
})

export const toggleLike = mutation({
	args: {
		authorId: v.id("authors"),
		userId: v.string(),
	},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity()
		if (!identity) {
			throw new ConvexError("Unauthenticated")
		}
		const author = await ctx.db.get(args.authorId)
		if (!author) {
			throw new ConvexError("Author doesn't exist")
		}

		const isLikeExists = author.likes.includes(args.userId)
		return ctx.db.patch(args.authorId, {
			likes: isLikeExists
				? author.likes.filter(id => args.userId !== id)
				: [...author.likes, args.userId],
		})
	},
})

export const updatePhoto = action({
	args: {
		authorId: v.id("authors"),
		arrayBuffer: v.bytes(),
	},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity()
		if (!identity) {
			throw new ConvexError("Authentication required")
		}

		const author = await ctx.runQuery(api.authors.getById, { authorId: args.authorId })
		if (!author) {
			throw new ConvexError("Author doesn't exists")
		}

		if (author.photo) {
			const currentImage = await ctx.runQuery(api.image.getById, { imageId: author.photo })
			if (!currentImage) {
				throw new ConvexError("Current photo doesn't exists")
			}
			await ctx.runAction(internal.imageKit.remove, { fileId: currentImage.fileId })
			await ctx.runMutation(internal.image.remove, { imageId: currentImage._id })
		}

		const uploadedImage = await ctx.runAction(internal.imageKit.upload, {
			arrayBuffer: args.arrayBuffer,
		})
		const newImage = await ctx.runMutation(internal.image.create, {
			fileId: uploadedImage.fileId,
			url: uploadedImage.url,
		})
		await ctx.runMutation(api.authors.update, {
			authorId: args.authorId,
			payload: { photo: newImage },
		})
	},
})
