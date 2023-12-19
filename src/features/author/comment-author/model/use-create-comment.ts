import { useMutation } from "convex/react"
import { useState } from "react"
import { api } from "@convex/_generated/api"
import { unexpectedErrorToast } from "@/shared/ui/toasts"
import { toast } from "sonner"

export const useCreateComment = () => {
	const [isPending, setIsPending] = useState<boolean>(false)
	const createCommentMutation = useMutation(api.comments.create)

	const handleCreate = async (payload: Parameters<typeof createCommentMutation>[0]) => {
		try {
			setIsPending(true)
			await createCommentMutation(payload)
			toast.success("Comment was successfully added")
		} catch (error) {
			unexpectedErrorToast()
		} finally {
			setIsPending(false)
		}
	}

	return {
		handleCreate,
		isPending,
	}
}
