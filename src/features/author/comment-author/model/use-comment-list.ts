import { useQuery } from "convex/react"
import { api } from "@convex/_generated/api"
import { Id } from "@convex/_generated/dataModel"

export const useCommentList = ({ authorId }: { authorId: Id<"authors"> }) => {
	const comments = useQuery(api.comments.getByAuthorId, { authorId })
	return { comments }
}
