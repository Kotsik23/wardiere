import { useAuth } from "@clerk/clerk-react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { ROUTES } from "@/shared/constants/routes.ts"

export const useSignOut = () => {
	const { signOut } = useAuth()
	const navigate = useNavigate()

	const handleSignOut = () => {
		const promise = signOut()
		toast.promise(promise, {
			loading: "Signing out...",
			success: () => {
				navigate(ROUTES.HOME)
				return "Signed out successfully"
			},
			error: "Failed to sign out",
		})
	}

	return {
		handleSignOut,
	}
}
