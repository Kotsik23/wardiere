import { mutation, query } from "./_generated/server"
import { ConvexError, v } from "convex/values"

export const getByAuthorId = query({
	args: {
		authorId: v.id("author"),
	},
	handler: async (ctx, args) => {
		const author = await ctx.db.get(args.authorId)
		if (!author) {
			throw new ConvexError("Author doesn't exists")
		}
		const res = await Promise.all(author.comments.map(commentId => ctx.db.get(commentId)))
		return res.reverse()
	},
})

export const create = mutation({
	args: {
		authorId: v.id("author"),
		userId: v.string(),
		text: v.string(),
	},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity()
		if (!identity) {
			throw new ConvexError("Authentication required")
		}
		const author = await ctx.db.get(args.authorId)
		if (!author) {
			throw new ConvexError("Author doesn't exists")
		}
		const newComment = await ctx.db.insert("comments", {
			userId: args.userId,
			text: args.text,
		})
		return ctx.db.patch(args.authorId, {
			comments: [...author.comments, newComment],
		})
	},
})

export const remove = mutation({
	args: {
		authorId: v.id("author"),
		commentId: v.id("comments"),
	},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity()
		if (!identity) {
			throw new ConvexError("Authentication required")
		}
		const author = await ctx.db.get(args.authorId)
		if (!author) {
			throw new ConvexError("Author doesn't exists")
		}
		await ctx.db.patch(args.authorId, {
			comments: author.comments.filter(commentId => commentId !== args.commentId),
		})
		return ctx.db.delete(args.commentId)
	},
})
