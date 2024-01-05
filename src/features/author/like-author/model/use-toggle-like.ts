import { useMutation } from "convex/react"
import { useState } from "react"
import { api } from "@convex/_generated/api"
import { unexpectedErrorToast } from "@/shared/ui/toasts"

export const useToggleLike = () => {
	const [isPending, setIsPending] = useState<boolean>(false)
	const toggleMutation = useMutation(api.likes.toggle)

	const handleToggle = async (args: Parameters<typeof toggleMutation>[0]) => {
		try {
			setIsPending(true)
			await toggleMutation(args)
		} catch (error) {
			unexpectedErrorToast()
		} finally {
			setIsPending(false)
		}
	}

	return {
		handleToggle,
		isPending,
	}
}
