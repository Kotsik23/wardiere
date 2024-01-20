import {
	action,
	internalAction,
	internalMutation,
	internalQuery,
	mutation,
	query,
} from "./_generated/server"
import { paginationOptsValidator } from "convex/server"
import { ConvexError, v } from "convex/values"
import { authorEmbeddingFields, authorFields, imageFields } from "./schema"
import { api, internal } from "./_generated/api"
import { Doc, Id } from "./_generated/dataModel"
import { asyncMap, pruneNull } from "convex-helpers"

export const getAll = query({
	args: {
		categories: v.array(v.id("categories")),
		paginationOpts: paginationOptsValidator,
	},
	handler: async (ctx, args) => {
		if (args.categories.length > 0) {
			const portfolios = await ctx.db
				.query("portfolios")
				.filter(q =>
					q.or(...args.categories.map(category => q.eq(q.field("categoryId"), category)))
				)
				.collect()

			const authorIds = new Set<Id<"authors">>()
			portfolios.forEach(portfolio => authorIds.add(portfolio.authorId))

			return ctx.db
				.query("authors")
				.filter(q =>
					q.or(...Array.from(authorIds).map(authorId => q.eq(q.field("_id"), authorId)))
				)
				.filter(q => q.eq(q.field("isPublic"), true))
				.order("desc")
				.paginate(args.paginationOpts)
		}

		return ctx.db
			.query("authors")
			.filter(q => q.eq(q.field("isPublic"), true))
			.order("desc")
			.paginate(args.paginationOpts)
	},
})

export const getById = query({
	args: {
		authorId: v.id("authors"),
	},
	handler: (ctx, args) => {
		return ctx.db.get(args.authorId)
	},
})

export const getByUserId = query({
	args: {
		userId: authorFields.userId,
	},
	handler: (ctx, args) => {
		return ctx.db
			.query("authors")
			.withIndex("by_userId")
			.filter(q => q.eq(q.field("userId"), args.userId))
			.unique()
	},
})

export const getStatistics = query({
	args: {
		take: v.optional(v.number()),
	},
	handler: async (ctx, args) => {
		const authors = await ctx.db
			.query("authors")
			.filter(q => q.eq(q.field("isPublic"), true))
			.collect()
		const users = await asyncMap(authors, author =>
			ctx.db
				.query("users")
				.withIndex("by_clerkId", q => q.eq("clerkUser.id", author.userId))
				.unique()
		)
		const likes = await ctx.db.query("likes").collect()
		const comments = await ctx.db.query("comments").collect()
		const portfolios = await ctx.db.query("portfolios").collect()

		const likesByAuthor = likes.reduce(
			(acc, like) => {
				acc[like.authorId] = acc[like.authorId] || []
				acc[like.authorId].push(like)
				return acc
			},
			{} as Record<Id<"authors">, Doc<"likes">[]>
		)

		const commentsByAuthor = comments.reduce(
			(acc, comment) => {
				acc[comment.authorId] = acc[comment.authorId] || []
				acc[comment.authorId].push(comment)
				return acc
			},
			{} as Record<Id<"authors">, Doc<"comments">[]>
		)

		const portfoliosByAuthor = portfolios.reduce(
			(acc, portfolio) => {
				acc[portfolio.authorId] = acc[portfolio.authorId] || []
				acc[portfolio.authorId].push(portfolio)
				return acc
			},
			{} as Record<Id<"authors">, Doc<"portfolios">[]>
		)

		const userByAuthorId = users.reduce(
			(acc, user) => {
				acc[user?.clerkUser.id] = user as Doc<"users">
				return acc
			},
			{} as Record<string, Doc<"users">>
		)

		return authors
			.map(author => ({
				...author,
				user: userByAuthorId[author.userId].clerkUser,
				stats: {
					likes: likesByAuthor[author._id]?.length || 0,
					comments: commentsByAuthor[author._id]?.length || 0,
					portfolios: portfoliosByAuthor[author._id]?.length || 0,
				},
			}))
			.sort((a, b) => {
				const totalA = a.stats.likes + a.stats.comments + a.stats.portfolios
				const totalB = b.stats.likes + b.stats.comments + b.stats.portfolios
				return totalB - totalA
			})
			.slice(0, args.take)
	},
})

export const create = mutation({
	args: {
		userId: v.string(),
	},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity()
		if (!identity) {
			throw new ConvexError("Authentication required")
		}
		return await ctx.db.insert("authors", {
			userId: args.userId,
			isPublic: false,
			keywords: [],
			contacts: {
				email: "",
				instagram: "",
				telegram: "",
			},
		})
	},
})

export const update = mutation({
	args: {
		authorId: v.id("authors"),
		payload: v.object({
			brand: v.optional(v.string()),
			aboutText: v.optional(v.string()),
			photo: v.optional(v.object(imageFields)),
			keywords: v.optional(v.array(v.string())),
			contacts: v.optional(
				v.object({
					email: v.string(),
					instagram: v.string(),
					telegram: v.string(),
				})
			),
		}),
	},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity()
		if (!identity) {
			throw new ConvexError("Authentication required")
		}
		await ctx.db.patch(args.authorId, args.payload)
		await ctx.scheduler.runAfter(0, internal.authors.generateAndAddEmbedding, {
			authorId: args.authorId,
		})
		await ctx.scheduler.runAfter(5000, internal.authors.similarForAll)
	},
})

export const remove = mutation({
	args: {
		authorId: v.id("authors"),
	},
	handler: async (ctx, args) => {
		const author = await ctx.db.get(args.authorId)
		if (!author) {
			throw new ConvexError("Author doesn't exists. (remove author)")
		}
		return ctx.db.delete(args.authorId)
	},
})

export const togglePublic = mutation({
	args: {
		authorId: v.id("authors"),
	},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity()
		if (!identity) {
			throw new ConvexError("Authentication required")
		}
		const author = await ctx.db.get(args.authorId)
		if (!author) {
			throw new ConvexError("Author doesn't exists")
		}
		return ctx.db.patch(args.authorId, {
			isPublic: !author.isPublic,
		})
	},
})

export const uploadPhoto = action({
	args: {
		authorId: v.id("authors"),
		arrayBuffer: v.bytes(), // MAX 1 MB
	},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity()
		if (!identity) {
			throw new ConvexError("Authentication required")
		}

		const author = await ctx.runQuery(api.authors.getById, { authorId: args.authorId })
		if (!author) {
			throw new ConvexError("Author doesn't exists")
		}

		if (author.photo) {
			await ctx.runAction(internal.imageKit.remove, { fileId: author.photo.fileId })
		}

		const { fileId, url } = await ctx.runAction(internal.imageKit.upload, {
			payload: args.arrayBuffer,
		})
		await ctx.runMutation(api.authors.update, {
			authorId: args.authorId,
			payload: {
				photo: {
					fileId,
					url,
				},
			},
		})
	},
})

export const populateAuthor = action({
	args: {
		authorId: v.id("authors"),
	},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity()
		if (!identity) {
			throw new ConvexError("Authenticated required")
		}
		let profileImage
		if (identity.pictureUrl) {
			const uploadedImage = await ctx.runAction(internal.imageKit.upload, {
				payload: identity.pictureUrl,
			})
			profileImage = {
				url: uploadedImage.url,
				fileId: uploadedImage.fileId,
			}
		} else {
			profileImage = undefined
		}
		await ctx.runMutation(api.authors.update, {
			authorId: args.authorId,
			payload: {
				photo: profileImage,
				contacts: {
					email: identity.email as string,
					instagram: "@" + identity.nickname,
					telegram: "@" + identity.nickname,
				},
			},
		})
	},
})

// Similar
export const getSimilarByAuthorId = query({
	args: {
		authorId: v.id("authors"),
	},
	handler: async (ctx, args) => {
		const similarAuthorsRow = await ctx.db
			.query("similarAuthors")
			.withIndex("by_authorId", q => q.eq("authorId", args.authorId))
			.unique()
		if (!similarAuthorsRow) {
			// No similar authors founded
			return null
		}
		const similarAuthors = await asyncMap(similarAuthorsRow.similar, id => ctx.db.get(id))
		return pruneNull(similarAuthors).filter(author => author._id !== args.authorId)
	},
})

export const similarForAll = internalAction({
	handler: async ctx => {
		const authors = await ctx.runQuery(internal.authors.getAllRawAuthors)
		for (const author of authors) {
			const index = authors.indexOf(author)
			await ctx.scheduler.runAfter((index + 1) * 30000, internal.authors.generateAndAddSimilar, {
				authorId: author._id,
			})
		}
	},
})

export const getAllRawAuthors = internalQuery({
	handler: ctx => {
		return ctx.db.query("authors").collect()
	},
})

export const generateAndAddSimilar = internalAction({
	args: {
		authorId: v.id("authors"),
	},
	handler: async (ctx, args) => {
		const input = await ctx.runAction(internal.authors.getEmbeddingInput, {
			authorId: args.authorId,
		})
		if (input.length <= 0) {
			// No input for create embedding
			return
		}
		const embedding = await ctx.runAction(internal.openai.embed, {
			text: input,
		})
		const results = await ctx.vectorSearch("authorEmbeddings", "by_embedding", {
			limit: 3,
			vector: embedding,
		})
		const similarAuthors: Array<Doc<"authors">> = await ctx.runQuery(
			internal.authors.getAuthorsByEmbeddings,
			{
				authorEmbeddingsIds: results.map(res => res._id),
			}
		)
		await ctx.runMutation(internal.authors.addSimilar, {
			authorId: args.authorId,
			similar: similarAuthors.map(author => author._id),
		})
	},
})

export const getAuthorsByEmbeddings = internalQuery({
	args: {
		authorEmbeddingsIds: v.array(v.id("authorEmbeddings")),
	},
	handler: async (ctx, args) => {
		const authorsEmbeddings: Array<Doc<"authorEmbeddings">> = pruneNull(
			await asyncMap(args.authorEmbeddingsIds, id => ctx.db.get(id))
		)
		const authorIds = authorsEmbeddings.map(embedding => embedding.authorId)
		const authors = await asyncMap(authorIds, id =>
			ctx.db
				.query("authors")
				.filter(q => q.eq(q.field("_id"), id))
				.unique()
		)
		return pruneNull(authors)
	},
})

export const addSimilar = internalMutation({
	args: {
		authorId: v.id("authors"),
		similar: v.array(v.id("authors")),
	},
	handler: async (ctx, args) => {
		const similarRow = await ctx.db
			.query("similarAuthors")
			.filter(q => q.eq(q.field("authorId"), args.authorId))
			.unique()
		if (similarRow) {
			await ctx.db.delete(similarRow._id)
		}
		await ctx.db.insert("similarAuthors", {
			authorId: args.authorId,
			similar: args.similar,
		})
	},
})

// Embeddings
export const generateAndAddEmbedding = internalAction({
	args: {
		authorId: v.id("authors"),
	},
	handler: async (ctx, args) => {
		const input = await ctx.runAction(internal.authors.getEmbeddingInput, {
			authorId: args.authorId,
		})
		if (input.length <= 0) {
			// No input for create embedding
			return
		}
		const embedding = await ctx.runAction(internal.openai.embed, {
			text: input,
		})
		await ctx.runMutation(internal.authors.addEmbedding, {
			authorId: args.authorId,
			embedding,
		})
	},
})

export const getEmbeddingInput = internalAction({
	args: {
		authorId: v.id("authors"),
	},
	handler: async (ctx, args): Promise<string[]> => {
		const author = await ctx.runQuery(api.authors.getById, { authorId: args.authorId })
		if (author === null) {
			// Author doesn't exist
			return []
		}
		const bareCategories = (await ctx.runQuery(api.categories.getAll, {
			authorId: args.authorId,
		})) as (Doc<"categories"> & { has: boolean })[]
		const categories = bareCategories.filter(c => c.has).map(c => c.name)
		return Array.of(author.keywords, categories).flat()
	},
})

export const addEmbedding = internalMutation({
	args: {
		authorId: v.id("authors"),
		embedding: v.array(v.float64()),
	},
	handler: async (ctx, args) => {
		const existsEmbedding = await ctx.db
			.query("authorEmbeddings")
			.withIndex("by_authorId", q => q.eq("authorId", args.authorId))
			.unique()
		if (existsEmbedding) {
			await ctx.db.delete(existsEmbedding._id)
		}
		await ctx.db.insert("authorEmbeddings", {
			authorId: args.authorId,
			embedding: args.embedding,
		})
	},
})
