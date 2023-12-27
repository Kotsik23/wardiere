import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export const authorFields = {
	userId: v.string(),
	brand: v.optional(v.string()),
	aboutText: v.optional(v.string()),
	photo: v.optional(v.id("images")),
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

export const userFields = {
	clerk_id: v.string(),
	image_url: v.optional(v.union(v.string(), v.null())),
	first_name: v.optional(v.union(v.string(), v.null())),
	last_name: v.optional(v.union(v.string(), v.null())),
	username: v.optional(v.union(v.string(), v.null())),
	email_addresses: v.array(
		v.object({
			email_address: v.union(v.string(), v.null()),
		})
	),
}

export const commentFields = {
	authorId: v.id("authors"),
	userId: v.string(),
	text: v.string(),
}

export default defineSchema({
	authors: defineTable(authorFields).index("by_userId", ["userId"]),
	users: defineTable(userFields).index("by_clerk_id", ["clerk_id"]),
	comments: defineTable(commentFields).index("by_author_id", ["authorId"]),
	categories: defineTable({
		name: v.string(),
		slug: v.string(),
	}),
	images: defineTable({
		fileId: v.string(),
		url: v.string(),
	}),
})
