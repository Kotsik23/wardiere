import { internalMutation, internalQuery } from "./_generated/server"
import { userFields } from "./schema"
import { ConvexError, v } from "convex/values"

export const getByClerkId = internalQuery({
	args: {
		clerkId: v.string(),
	},
	handler: async (ctx, args) => {
		const clerkUser = await ctx.db
			.query("users")
			.filter(q => q.eq(q.field("clerk_id"), args.clerkId))
			.unique()
		if (!clerkUser) {
			throw new ConvexError("User doesn't exists")
		}
		return ctx.db.get(clerkUser._id)
	},
})

export const create = internalMutation({
	args: userFields,
	handler: (ctx, args) => {
		return ctx.db.insert("users", args)
	},
})

export const update = internalMutation({
	args: {
		clerk_id: v.string(),
		image_url: v.optional(v.string()),
		first_name: v.optional(v.string()),
		last_name: v.optional(v.string()),
		username: v.optional(v.string()),
		email_addresses: v.optional(
			v.array(
				v.object({
					email_address: v.string(),
				})
			)
		),
	},
	handler: async (ctx, args) => {
		const clerkUser = await ctx.db
			.query("users")
			.filter(q => q.eq(q.field("clerk_id"), args.clerk_id))
			.unique()
		if (!clerkUser) {
			throw new ConvexError("User doesn't exists")
		}
		return ctx.db.patch(clerkUser._id, args)
	},
})

export const remove = internalMutation({
	args: {
		clerk_id: v.string(),
	},
	handler: async (ctx, args) => {
		const clerkUser = await ctx.db
			.query("users")
			.filter(q => q.eq(q.field("clerk_id"), args.clerk_id))
			.unique()
		if (!clerkUser) {
			throw new ConvexError("User doesn't exists")
		}
		return ctx.db.delete(clerkUser._id)
	},
})
