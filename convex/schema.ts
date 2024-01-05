import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export const imageFields = {
	url: v.string(),
	fileId: v.string(),
}

export const authorFields = {
	userId: v.string(),
	brand: v.optional(v.string()),
	aboutText: v.optional(v.string()),
	photo: v.optional(v.object(imageFields)),
	keywords: v.array(v.string()),
	isPublic: v.boolean(),
}

export const commentFields = {
	authorId: v.id("authors"),
	clerkUserId: v.string(),
	text: v.string(),
}

export const likeFields = {
	authorId: v.id("authors"),
	clerkUserId: v.string(),
}

export const portfolioFields = {
	authorId: v.id("authors"),
	categoryId: v.id("categories"),
	...imageFields,
}

export default defineSchema({
	users: defineTable({
		// this is UserJSON from @clerk/backend
		clerkUser: v.any(),
	}).index("by_clerk_id", ["clerkUser.id"]),
	authors: defineTable(authorFields).index("by_userId", ["userId"]),
	comments: defineTable(commentFields).index("by_author_id", ["authorId"]),
	likes: defineTable(likeFields).index("by_author_id", ["authorId"]),
	categories: defineTable({
		name: v.string(),
	}),
	portfolios: defineTable(portfolioFields).index("by_author_category", ["authorId", "categoryId"]),
})
