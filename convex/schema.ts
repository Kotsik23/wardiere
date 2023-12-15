import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
	categories: defineTable({
		name: v.string(),
		slug: v.string(),
	}),
	author: defineTable({
		userId: v.string(),
		brand: v.optional(v.string()),
		keywords: v.optional(v.array(v.string())),
		contacts: v.optional(
			v.object({
				email: v.optional(v.string()),
			})
		),
	}).index("by_userId", ["userId"]),
})
