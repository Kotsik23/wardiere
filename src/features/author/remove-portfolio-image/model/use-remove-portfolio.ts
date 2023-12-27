import { useAction } from "convex/react"
import { toast } from "sonner"
import { api } from "@convex/_generated/api"
import { unexpectedErrorToast } from "@/shared/ui/toasts"
import { useState } from "react"

export const useRemovePortfolio = () => {
	const [isPending, setIsPending] = useState<boolean>(false)
	const removePortfolioAction = useAction(api.portfolioImages.deleteImage)

	const handleRemove = async (args: Parameters<typeof removePortfolioAction>[0]) => {
		try {
			setIsPending(true)
			await removePortfolioAction(args)
			toast.success("Image was removed")
		} catch (error) {
			unexpectedErrorToast()
		} finally {
			setIsPending(false)
		}
	}

	return {
		handleRemove,
		isPending,
	}
}
