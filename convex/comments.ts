import { mutation, query } from "./_generated/server"
import { ConvexError, v } from "convex/values"
import { paginationOptsValidator } from "convex/server"
import { commentFields } from "./schema"

export const getByAuthorId = query({
	args: {
		authorId: v.id("authors"),
	},
	handler: async (ctx, args) => {
		const comments = await ctx.db
			.query("comments")
			.withIndex("by_author_id")
			.filter(q => q.eq(q.field("authorId"), args.authorId))
			.order("desc")
			.collect()
		const usersPromises = comments.map(comment =>
			ctx.db
				.query("users")
				.withIndex("by_clerk_id")
				.filter(q => q.eq(q.field("clerk_id"), comment.userId))
				.unique()
		)
		const users = await Promise.all(usersPromises)
		return comments.map((comment, index) => {
			return {
				comment: comment,
				user: users[index],
			}
		})
	},
})

export const create = mutation({
	args: commentFields,
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
			authorId: args.authorId,
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
		authorId: v.id("authors"),
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
