import { useAction } from "convex/react"
import { ConvexError } from "convex/values"
import { useState } from "react"
import { toast } from "sonner"
import { api } from "@convex/_generated/api"
import { AboutTextCompletionType } from "./types.ts"

export const useAboutTextCompletion = () => {
	const [isPending, setIsPending] = useState<boolean>(false)
	const aboutTextCompletionAction = useAction(api.openai.aboutTextCompletion)

	const handleCompletion = (onCompletionEnd: (data: AboutTextCompletionType) => void) => {
		const promise = aboutTextCompletionAction()
		setIsPending(true)
		toast.promise(promise, {
			loading: "Completion was started. Please wait...",
			success: data => {
				onCompletionEnd(data)
				return "Completion is done"
			},
			error: e => {
				return e instanceof ConvexError ? e.data : "Unexpected error occurred"
			},
			finally: () => {
				setIsPending(false)
			},
		})
	}

	return {
		handleCompletion,
		isPending,
	}
}
