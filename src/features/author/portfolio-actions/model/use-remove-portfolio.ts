import { useAction } from "convex/react"
import { toast } from "sonner"
import { api } from "@convex/_generated/api"

export const useRemovePortfolio = () => {
	const removePortfolioAction = useAction(api.portfolios.removeUpload)

	const handleRemove = (args: Parameters<typeof removePortfolioAction>[0]) => {
		const promise = removePortfolioAction(args)
		toast.promise(promise, {
			loading: "Removing portfolio...",
			success: "Portfolio successfully removed",
			error: "Failed remove portfolio",
		})
	}

	return {
		handleRemove,
	}
}
