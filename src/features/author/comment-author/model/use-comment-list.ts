import { usePaginatedQuery } from "convex/react"
import { api } from "@convex/_generated/api"
import { Id } from "@convex/_generated/dataModel"

export const useCommentList = ({
	authorId,
	initialNumItems = 5,
}: {
	authorId: Id<"authors">
	initialNumItems?: number
}) => {
	const query = usePaginatedQuery(api.comments.getByAuthor, { authorId }, { initialNumItems })
	return { query }
}
