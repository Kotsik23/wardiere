import { useMutation } from "convex/react"
import { useState } from "react"
import { toast } from "sonner"
import { api } from "@convex/_generated/api"
import { unexpectedErrorToast } from "@/shared/ui/toasts"

export const useDeleteComment = () => {
	const [isPending, setIsPending] = useState<boolean>(false)
	const removeCommentMutation = useMutation(api.comments.remove)

	const handleDelete = async (payload: Parameters<typeof removeCommentMutation>[0]) => {
		try {
			setIsPending(true)
			await removeCommentMutation(payload)
			toast.warning("Comment was deleted")
		} catch (error) {
			unexpectedErrorToast()
		} finally {
			setIsPending(false)
		}
	}

	return {
		handleDelete,
		isPending,
	}
}
