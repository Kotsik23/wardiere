import { useConvex, useMutation, usePaginatedQuery, useQuery } from "convex/react"
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

export const useRemoveAuthor = () => {
	const removeAuthorMutation = useMutation(api.authors.remove)
	return {
		removeAuthorMutation,
	}
}

export const useGetAuthors = ({ initialNumItems }: { initialNumItems: number }) => {
	const query = usePaginatedQuery(api.authors.getAll, {}, { initialNumItems })

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

export const useGetAuthorPhoto = ({ imageId }: { imageId: Id<"images"> | undefined }) => {
	return useQuery(api.image.getById, imageId ? { imageId: imageId } : "skip")
}
