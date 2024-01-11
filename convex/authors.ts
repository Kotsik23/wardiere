import { action, mutation, query } from "./_generated/server"
import { paginationOptsValidator } from "convex/server"
import { ConvexError, v } from "convex/values"
import { authorFields, imageFields } from "./schema"
import { api, internal } from "./_generated/api"
import { Id } from "./_generated/dataModel"

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

export const create = mutation({
	args: {
		userId: v.string(),
	},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity()
		if (!identity) {
			throw new ConvexError("Authentication required")
		}
		return ctx.db.insert("authors", {
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
		return ctx.db.patch(args.authorId, args.payload)
	},
})

export const remove = mutation({
	args: {
		authorId: v.id("authors"),
	},
	handler: async (ctx, args) => {
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
