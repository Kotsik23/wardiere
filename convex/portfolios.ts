import { action, internalMutation, internalQuery, query } from "./_generated/server"
import { ConvexError, v } from "convex/values"
import { paginationOptsValidator } from "convex/server"
import { portfolioFields } from "./schema"
import { internal } from "./_generated/api"

export const getByAuthorCategory = query({
	args: {
		authorId: v.id("authors"),
		categoryId: v.id("categories"),
		order: v.union(v.literal("asc"), v.literal("desc")),
		paginationOpts: paginationOptsValidator,
	},
	handler: (ctx, args) => {
		return ctx.db
			.query("portfolios")
			.withIndex("by_authorId_categoryId", q =>
				q.eq("authorId", args.authorId).eq("categoryId", args.categoryId)
			)
			.order(args.order)
			.paginate(args.paginationOpts)
	},
})

export const getHero = query({
	args: {
		take: v.optional(v.number()),
	},
	handler: async (ctx, args) => {
		return ctx.db
			.query("portfolios")
			.order("desc")
			.take(args.take || 5)
	},
})

export const upload = action({
	args: {
		authorId: portfolioFields.authorId,
		categoryId: portfolioFields.categoryId,
		arrayBuffer: v.bytes(), // MAX 1 MB
	},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity()
		if (!identity) {
			throw new ConvexError("Unauthenticated")
		}
		const { fileId, url } = await ctx.runAction(internal.imageKit.upload, {
			payload: args.arrayBuffer,
		})
		await ctx.runMutation(internal.portfolios.create, {
			authorId: args.authorId,
			categoryId: args.categoryId,
			fileId,
			url,
		})
		await ctx.scheduler.runAfter(0, internal.authors.generateAndAddEmbedding, {
			authorId: args.authorId,
		})
		await ctx.scheduler.runAfter(5000, internal.authors.similarForAll)
	},
})

export const removeUpload = action({
	args: {
		portfolioId: v.id("portfolios"),
	},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity()
		if (!identity) {
			throw new ConvexError("Unauthenticated")
		}
		const portfolio = await ctx.runQuery(internal.portfolios.getById, {
			portfolioId: args.portfolioId,
		})
		if (!portfolio) {
			throw new ConvexError("Portfolio doesn't exists")
		}
		await ctx.runAction(internal.imageKit.remove, { fileId: portfolio.fileId })
		await ctx.runMutation(internal.portfolios.remove, { portfolioId: args.portfolioId })
		await ctx.scheduler.runAfter(0, internal.authors.generateAndAddEmbedding, {
			authorId: portfolio.authorId,
		})
		await ctx.scheduler.runAfter(5000, internal.authors.similarForAll)
	},
})

export const getById = internalQuery({
	args: {
		portfolioId: v.id("portfolios"),
	},
	handler: (ctx, args) => {
		return ctx.db.get(args.portfolioId)
	},
})

export const create = internalMutation({
	args: portfolioFields,
	handler: (ctx, args) => {
		return ctx.db.insert("portfolios", args)
	},
})

export const remove = internalMutation({
	args: {
		portfolioId: v.id("portfolios"),
	},
	handler: (ctx, args) => {
		return ctx.db.delete(args.portfolioId)
	},
})
