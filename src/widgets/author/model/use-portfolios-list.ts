import { usePaginatedQuery } from "convex/react"
import { api } from "@convex/_generated/api"
import { Id } from "@convex/_generated/dataModel"

export const usePortfoliosList = ({
	authorId,
	categoryId,
	initialNumItems = 10,
}: {
	authorId: Id<"authors">
	categoryId: Id<"categories">
	initialNumItems?: number
}) => {
	const query = usePaginatedQuery(
		api.portfolios.getByAuthorCategory,
		{ authorId, categoryId },
		{ initialNumItems }
	)
	return { query }
}
