import { mutation, query } from "./_generated/server"
import { paginationOptsValidator } from "convex/server"
import { ConvexError, v } from "convex/values"

export const getAll = query({
	args: {
		paginationOpts: paginationOptsValidator,
	},
	handler: async (ctx, args) => {
		return await ctx.db.query("author").order("desc").paginate(args.paginationOpts)
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
