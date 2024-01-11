import { useAction, useConvex, useMutation, usePaginatedQuery, useQuery } from "convex/react"
import { api } from "@convex/_generated/api"
import { Id } from "@convex/_generated/dataModel"

export const useCreateAuthor = () => {
	const createAuthorMutation = useMutation(api.authors.create)
	return {
		createAuthorMutation,
	}
}

export const useUpdateAuthor = () => {
	const updateAuthorMutation = useMutation(api.authors.update)
	return {
		updateAuthorMutation,
	}
}

export const usePopulateAuthor = () => {
	const populateAuthorAction = useAction(api.authors.populateAuthor)
	return { populateAuthorAction }
}

export const useGetAuthors = ({
	categories,
	initialNumItems,
}: {
	categories?: Id<"categories">[]
	initialNumItems: number
}) => {
	const query = usePaginatedQuery(
		api.authors.getAll,
		{ categories: categories || [] },
		{
			initialNumItems,
		}
	)

	return { query }
}

export const useGetAuthorById = ({ authorId }: { authorId: Id<"authors"> | undefined }) => {
	return useQuery(api.authors.getById, authorId ? { authorId } : "skip")
}

export const useGetAuthorByUserId = () => {
	const convex = useConvex()

	const getAuthorByUserId = ({ userId }: { userId: string }) => {
		return convex.query(api.authors.getByUserId, { userId })
	}

	return {
		getAuthorByUserId,
	}
}
