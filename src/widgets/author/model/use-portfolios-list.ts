import { usePaginatedQuery } from "convex/react"
import { api } from "@convex/_generated/api"
import { Id } from "@convex/_generated/dataModel"

export const usePortfoliosList = ({
	authorId,
	categoryId,
	order,
	initialNumItems = 10,
}: {
	authorId: Id<"authors">
	categoryId: Id<"categories">
	order: "asc" | "desc"
	initialNumItems?: number
}) => {
	const query = usePaginatedQuery(
		api.portfolios.getByAuthorCategory,
		categoryId.trim() !== "" ? { authorId, categoryId, order } : "skip",
		{ initialNumItems }
	)
	return { query }
}
