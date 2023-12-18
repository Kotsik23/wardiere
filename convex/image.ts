import { mutation, query } from "./_generated/server"
import { ConvexError, v } from "convex/values"

export const getById = query({
	args: {
		imageId: v.id("image"),
	},
	handler: (ctx, args) => {
		return ctx.db.get(args.imageId)
	},
})

export const create = mutation({
	args: {
		fileId: v.string(),
		url: v.string(),
	},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity()
		if (!identity) {
			throw new ConvexError("Authentication required")
		}
		return ctx.db.insert("image", args)
	},
})

export const remove = mutation({
	args: {
		imageId: v.id("image"),
	},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity()
		if (!identity) {
			throw new ConvexError("Authentication required")
		}

		return ctx.db.delete(args.imageId)
	},
})
