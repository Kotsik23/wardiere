import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { useCreateAuthor, useGetAuthorByUserId } from "@/entities/author"
import { usePopulateAuthor } from "@/entities/author/model/queries.ts"
import { ROUTES } from "@/shared/constants/routes.ts"
import { createRedirectLink } from "@/shared/lib/create-redirect-link.ts"

export const useAuthorButton = () => {
	const { createAuthorMutation } = useCreateAuthor()
	const { populateAuthorAction } = usePopulateAuthor()
	const { getAuthorByUserId } = useGetAuthorByUserId()
	const navigate = useNavigate()

	const handleClick = async ({ userId }: { userId: string | undefined }) => {
		if (!userId) {
			return navigate(createRedirectLink({ pathname: ROUTES.SIGN_UP, to: ROUTES.EXPLORE }))
		}
		try {
			const isExistsAuthor = await getAuthorByUserId({ userId })
			if (isExistsAuthor) {
				return navigate(ROUTES.AUTHOR_EDIT(isExistsAuthor._id))
			}
			const newAuthorPromise = createAuthorMutation({ userId })
			toast.promise(newAuthorPromise, {
				loading: "Creating author for you...",
				success: authorId => {
					populateAuthorAction({ authorId })
					navigate(ROUTES.AUTHOR_EDIT(authorId))
					return "Successfully created"
				},
				error: "Failed to create an author",
			})
		} catch (error) {
			toast.error("Unexpected error occurred")
		}
	}

	return {
		handleClick,
	}
}
