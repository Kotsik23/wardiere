import { useMutation } from "convex/react"
import { useState } from "react"
import { toast } from "sonner"
import { api } from "@convex/_generated/api"
import { Id } from "@convex/_generated/dataModel"
import { unexpectedErrorToast } from "@/shared/ui/toasts"

export const useTogglePublic = () => {
	const [isPending, setPending] = useState<boolean>(false)
	const togglePublicMutation = useMutation(api.authors.togglePublic)

	const handleTogglePublic = async ({ authorId }: { authorId: Id<"authors"> | undefined }) => {
		if (!authorId) {
			return toast.error("Author doesn't exists")
		}
		try {
			setPending(true)
			await togglePublicMutation({ authorId })
			toast.success("Successfully updated")
		} catch (error) {
			unexpectedErrorToast()
		} finally {
			setPending(false)
		}
	}

	return {
		handleTogglePublic,
		isPending,
	}
}
