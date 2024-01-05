import { useAction } from "convex/react"
import { api } from "@convex/_generated/api"
import { unexpectedErrorToast } from "@/shared/ui/toasts"

export const useUploadAuthorPortfolio = () => {
	const uploadPortfolioAction = useAction(api.portfolios.upload)

	const handleUploadPortfolio = async (args: Parameters<typeof uploadPortfolioAction>[0]) => {
		try {
			await uploadPortfolioAction(args)
		} catch (error) {
			unexpectedErrorToast()
		}
	}

	return {
		handleUploadPortfolio,
	}
}
