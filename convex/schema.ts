import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export const authorFields = {
	userId: v.string(),
	brand: v.optional(v.string()),
	keywords: v.array(v.string()),
	likes: v.array(v.string()),
	isPublic: v.boolean(),
	contacts: v.optional(
		v.object({
			email: v.optional(v.string()),
		})
	),
}

export default defineSchema({
	categories: defineTable({
		name: v.string(),
		slug: v.string(),
	}),
	author: defineTable(authorFields).index("by_userId", ["userId"]),
})
