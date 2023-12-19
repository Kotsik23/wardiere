import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export const authorFields = {
	userId: v.string(),
	brand: v.optional(v.string()),
	aboutText: v.optional(v.string()),
	photo: v.optional(v.id("image")),
	keywords: v.array(v.string()),
	likes: v.array(v.string()),
	comments: v.array(v.id("comments")),
	isPublic: v.boolean(),
	contacts: v.optional(
		v.object({
			email: v.optional(v.string()),
		})
	),
}

export default defineSchema({
	author: defineTable(authorFields).index("by_userId", ["userId"]),
	comments: defineTable({
		userId: v.string(),
		text: v.string(),
	}),
	categories: defineTable({
		name: v.string(),
		slug: v.string(),
	}),
	image: defineTable({
		fileId: v.string(),
		url: v.string(),
	}),
})
