import { internalMutation, mutation, query, QueryCtx } from "./_generated/server"
import { commentFields } from "./schema"
import { ConvexError, v } from "convex/values"
import { paginationOptsValidator } from "convex/server"
import { asyncMap } from "convex-helpers"
import { Doc } from "./_generated/dataModel"
import { UserJSON } from "@clerk/backend"

export const getByAuthor = query({
	args: {
		authorId: v.id("authors"),
		paginationOpts: paginationOptsValidator,
	},
	handler: async (ctx, args) => {
		const result = await ctx.db
			.query("comments")
			.withIndex("by_authorId", q => q.eq("authorId", args.authorId))
			.order("desc")
			.paginate(args.paginationOpts)
		return {
			...result,
			page: await enrichComments(ctx, result.page),
		}
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

async function enrichComments(ctx: QueryCtx, comments: Doc<"comments">[]) {
	return await asyncMap(comments, comment => enrichComment(ctx, comment))
}

async function enrichComment(ctx: QueryCtx, comment: Doc<"comments">) {
	const user = await ctx.db
		.query("users")
		.withIndex("by_clerkId", q => q.eq("clerkUser.id", comment.clerkUserId))
		.unique()
	return { comment, user: user?.clerkUser as UserJSON }
}
