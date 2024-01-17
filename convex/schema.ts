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
	contacts: v.object({
		email: v.string(),
		instagram: v.string(),
		telegram: v.string(),
	}),
	isPublic: v.boolean(),
	embeddingId: v.optional(v.id("authorEmbeddings")),
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
	}).index("by_clerkId", ["clerkUser.id"]),
	authors: defineTable(authorFields)
		.index("by_userId", ["userId"])
		.index("by_embeddingId", ["embeddingId"]),
	authorEmbeddings: defineTable({
		embedding: v.array(v.float64()),
	}).vectorIndex("by_embedding", {
		vectorField: "embedding",
		dimensions: 1536,
	}),
	comments: defineTable(commentFields).index("by_authorId", ["authorId"]),
	likes: defineTable(likeFields).index("by_authorId", ["authorId"]),
	categories: defineTable({
		name: v.string(),
	}),
	portfolios: defineTable(portfolioFields).index("by_authorId_categoryId", [
		"authorId",
		"categoryId",
	]),
})
