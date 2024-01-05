import { useQuery } from "convex/react"
import { api } from "@convex/_generated/api"
import { Id } from "@convex/_generated/dataModel"

export const useGetLikes = ({ authorId }: { authorId: Id<"authors"> }) => {
	const likes = useQuery(api.likes.getByAuthor, { authorId })
	return { likes }
}
