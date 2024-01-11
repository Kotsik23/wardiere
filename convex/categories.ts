import { query } from "./_generated/server"
import { v } from "convex/values"
import { Id } from "./_generated/dataModel"

export const getAll = query({
	args: {
		authorId: v.optional(v.id("authors")),
	},
	handler: async (ctx, args) => {
		const bareCategories = await ctx.db.query("categories").collect()
		if (args.authorId) {
			const portfolios = await ctx.db
				.query("portfolios")
				.filter(q => q.eq(q.field("authorId"), args.authorId))
				.collect()
			const categoriesIds = new Set<Id<"categories">>()
			portfolios.forEach(portfolio => categoriesIds.add(portfolio.categoryId))
			return bareCategories.map(category => ({
				...category,
				has: categoriesIds.has(category._id),
			}))
		}

		return bareCategories
	},
})
