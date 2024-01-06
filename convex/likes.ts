import { mutation, query } from "./_generated/server"
import { likeFields } from "./schema"
import { ConvexError } from "convex/values"

export const getByAuthor = query({
	args: {
		authorId: likeFields.authorId,
	},
	handler: (ctx, args) => {
		return ctx.db
			.query("likes")
			.withIndex("by_authorId", q => q.eq("authorId", args.authorId))
			.collect()
	},
})

export const toggle = mutation({
	args: likeFields,
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity()
		if (!identity) {
			throw new ConvexError("Authentication required")
		}
		const existingLike = await ctx.db
			.query("likes")
			.filter(q =>
				q.and(
					q.eq(q.field("authorId"), args.authorId),
					q.eq(q.field("clerkUserId"), args.clerkUserId)
				)
			)
			.first()
		if (existingLike) {
			return ctx.db.delete(existingLike._id)
		}
		return ctx.db.insert("likes", args)
	},
})
