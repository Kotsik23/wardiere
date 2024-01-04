import { internalMutation, mutation, query } from "./_generated/server"
import { commentFields } from "./schema"
import { ConvexError, v } from "convex/values"
import { paginationOptsValidator } from "convex/server"

export const getByAuthor = query({
	args: {
		authorId: v.id("authors"),
		paginationOpts: paginationOptsValidator,
	},
	handler: async (ctx, args) => {
		return ctx.db
			.query("comments")
			.withIndex("by_author_id", q => q.eq("authorId", args.authorId))
			.order("desc")
			.paginate(args.paginationOpts)
	},
})

export const create = mutation({
	args: commentFields,
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity()
		if (!identity) {
			throw new ConvexError("Authentication required")
		}

		return ctx.db.insert("comments", args)
	},
})

export const remove = mutation({
	args: {
		commentId: v.id("comments"),
	},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity()
		if (!identity) {
			throw new ConvexError("Authentication required")
		}

		return ctx.db.delete(args.commentId)
	},
})

export const removeAllByUser = internalMutation({
	args: {
		clerkUserId: v.string(),
	},
	handler: async (ctx, args) => {
		const comments = await ctx.db
			.query("comments")
			.filter(q => q.eq(q.field("clerkUserId"), args.clerkUserId))
			.collect()
		for (const comment of comments) {
			await ctx.db.delete(comment._id)
		}
	},
})
