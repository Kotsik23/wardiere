import { useAction } from "convex/react"
import { ConvexError } from "convex/values"
import { useState } from "react"
import { toast } from "sonner"
import { api } from "@convex/_generated/api"
import { unauthenticatedToast } from "@/shared/ui/toasts"
import { BrandCompletionType } from "./types.ts"

export const useBrandCompletion = () => {
	const [isPending, setIsPending] = useState<boolean>(false)
	const brandCompletionAction = useAction(api.openai.brandCompletion)

	const handleCompletion = ({
		onCompletionEnd,
		args,
	}: {
		onCompletionEnd: (data: BrandCompletionType) => void
		args: Parameters<typeof brandCompletionAction>[0]
	}) => {
		if (!args.username) {
			unauthenticatedToast()
		}
		const promise = brandCompletionAction(args)
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
