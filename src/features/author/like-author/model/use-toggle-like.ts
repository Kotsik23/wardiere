import { useMutation } from "convex/react"
import { useState } from "react"
import { toast } from "sonner"
import { api } from "@convex/_generated/api"
import { Id } from "@convex/_generated/dataModel"
import { unauthenticatedToast } from "@/shared/ui/toasts"

export const useToggleLike = () => {
	const [isPending, setPending] = useState<boolean>(false)
	const toggleLike = useMutation(api.authors.toggleLike)

	const handleToggle = async ({
		authorId,
		userId,
	}: {
		authorId: Id<"authors">
		userId: string | undefined
	}) => {
		if (!userId) {
			return unauthenticatedToast()
		}
		try {
			setPending(true)
			await toggleLike({
				authorId: authorId,
				userId: userId as string,
			})
		} catch (e) {
			toast.error("Unexpected error occurred")
		} finally {
			setPending(false)
		}
	}

	return {
		handleToggle,
		isPending,
	}
}
