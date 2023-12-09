import { mutation } from "./_generated/server"
import { ConvexError, v } from "convex/values"

export const createTask = mutation({
	args: {
		text: v.string(),
	},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity()
		if (!identity) {
			throw new ConvexError("Unauthorized")
		}
		return ctx.db.insert("tasks", {
			text: args.text,
			isCompleted: false,
		})
	},
})
