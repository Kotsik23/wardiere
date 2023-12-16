import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { useCreateAuthor, useGetAuthorByUserId } from "@/entities/author"
import { ROUTES } from "@/shared/constants/routes.ts"
import { unauthenticatedToast } from "@/shared/ui/toasts"

export const useAuthorButton = () => {
	const { createAuthorMutation } = useCreateAuthor()
	const { getAuthorByUserId } = useGetAuthorByUserId()
	const navigate = useNavigate()

	const handleClick = async ({ userId }: { userId: string | undefined }) => {
		if (!userId) {
			return unauthenticatedToast()
		}
		try {
			const isExistsAuthor = await getAuthorByUserId({ userId })
			if (isExistsAuthor) {
				return navigate(ROUTES.AUTHOR(isExistsAuthor._id))
			}
			const newAuthorPromise = createAuthorMutation({ userId })
			toast.promise(newAuthorPromise, {
				loading: "Creating author for you...",
				success: authorId => {
					navigate(ROUTES.AUTHOR(authorId))
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
