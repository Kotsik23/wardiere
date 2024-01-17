import { action } from "./_generated/server"
import { ConvexError, v } from "convex/values"
import { api, internal } from "./_generated/api"
import { Doc } from "./_generated/dataModel"

export const getSimilarAuthors = action({
	args: {
		authorId: v.id("authors"),
	},
	handler: async (ctx, args): Promise<(Doc<"authors"> | null)[]> => {
		const authorFor = await ctx.runQuery(api.authors.getById, { authorId: args.authorId })
		if (!authorFor) {
			// No author for update
			throw new ConvexError("Author doesn't exists. (getSimilarAuthors)")
		}
		const input = await ctx.runAction(internal.authors.getEmbeddingInput, {
			authorId: args.authorId,
		})
		const embedding = await ctx.runAction(internal.openai.embed, { text: input })
		const results = await ctx.vectorSearch("authorEmbeddings", "by_embedding", {
			vector: embedding,
			limit: 4,
		})
		const authors = await ctx.runQuery(internal.authors.getAllByEmbeddings, {
			embeddingIds: results.map(res => res._id),
		})
		return authors.filter(author => author?._id !== args.authorId)
	},
})
