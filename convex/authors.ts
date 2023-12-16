import { mutation, query } from "./_generated/server"
import { paginationOptsValidator } from "convex/server"
import { ConvexError, v } from "convex/values"
import { authorFields } from "./schema"

export const getAll = query({
	args: {
		paginationOpts: paginationOptsValidator,
	},
	handler: async (ctx, args) => {
		return await ctx.db
			.query("author")
			.filter(q => q.neq(q.field("isPublic"), false))
			.order("desc")
			.paginate(args.paginationOpts)
	},
})

export const getById = query({
	args: {
		authorId: v.id("author"),
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
			.query("author")
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
		return ctx.db.insert("author", {
			userId: args.userId,
			isPublic: false,
			likes: [],
			keywords: [],
		})
	},
})

export const remove = mutation({
	args: {
		authorId: v.id("author"),
	},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity()
		if (!identity) {
			throw new ConvexError("Unauthenticated")
		}
		return ctx.db.delete(args.authorId)
	},
})

export const toggleLike = mutation({
	args: {
		authorId: v.id("author"),
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
