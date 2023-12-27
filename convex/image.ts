import { internalMutation, query } from "./_generated/server"
import { v } from "convex/values"

export const getById = query({
	args: {
		imageId: v.id("images"),
	},
	handler: (ctx, args) => {
		return ctx.db.get(args.imageId)
	},
})

export const create = internalMutation({
	args: {
		fileId: v.string(),
		url: v.string(),
	},
	handler: async (ctx, args) => {
		return ctx.db.insert("images", args)
	},
})

export const remove = internalMutation({
	args: {
		imageId: v.id("images"),
	},
	handler: async (ctx, args) => {
		return ctx.db.delete(args.imageId)
	},
})
