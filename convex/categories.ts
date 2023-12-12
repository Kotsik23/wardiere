import { query } from "./_generated/server"

export const getAll = query({
	args: {},
	handler: async ctx => {
		return ctx.db.query("categories").collect()
	},
})
