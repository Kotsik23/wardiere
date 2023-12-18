import { useState } from "react"
import { toast } from "sonner"
import { useUpdateAuthor } from "@/entities/author"

export const useEditable = () => {
	const [toastId, setToastId] = useState<string | number>()
	const { updateAuthorMutation } = useUpdateAuthor()

	const handleUpdate = (payload: Parameters<typeof updateAuthorMutation>[0]) => {
		const promise = updateAuthorMutation(payload)
		if (toastId) {
			toast.promise(promise, {
				id: toastId,
				loading: "Updating...",
				success: "Successfully updated",
				error: "Failed updating",
			})
		} else {
			const newToastId = toast.promise(promise, {
				loading: "Updating...",
				success: "Successfully updated",
				error: "Failed updating",
			})
			setToastId(newToastId)
		}
	}

	return { handleUpdate }
}
