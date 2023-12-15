import { query } from "./_generated/server"
import { paginationOptsValidator } from "convex/server"

export const getAll = query({
	args: {
		paginationOpts: paginationOptsValidator,
	},
	handler: async (ctx, args) => {
		return await ctx.db.query("author").order("desc").paginate(args.paginationOpts)
	},
})
