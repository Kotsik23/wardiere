import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
	categories: defineTable({
		name: v.string(),
		slug: v.string(),
	}),
})
