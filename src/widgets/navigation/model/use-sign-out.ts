import { useAuth } from "@clerk/clerk-react"
import { toast } from "sonner"

export const useSignOut = () => {
	const { signOut } = useAuth()

	const handleSignOut = () => {
		const promise = signOut()
		toast.promise(promise, {
			loading: "Signing out...",
			success: "Signed out successfully",
			error: "Failed to sign out",
		})
	}

	return {
		handleSignOut,
	}
}
