import { useState } from "react"
import { toast } from "sonner"
import { Id } from "@convex/_generated/dataModel"
import { useUpdateAuthor } from "@/entities/author"

export const useEditableBrand = () => {
	const [toastId, setToastId] = useState<string | number>()
	const { updateAuthorMutation } = useUpdateAuthor()

	const handleUpdate = ({
		authorId,
		payload,
	}: {
		authorId: Id<"author">
		payload: { brand: string | undefined }
	}) => {
		const promise = updateAuthorMutation({ authorId, payload })
		if (toastId) {
			toast.promise(promise, {
				id: toastId,
				loading: "Updating brand...",
				success: "Successfully updated",
				error: "Failed updating brand",
			})
		} else {
			const newToastId = toast.promise(promise, {
				loading: "Updating brand...",
				success: "Successfully updated",
				error: "Failed updating brand",
			})
			setToastId(newToastId)
		}
	}

	return { handleUpdate }
}
