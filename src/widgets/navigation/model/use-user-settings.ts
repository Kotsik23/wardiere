import { useClerk } from "@clerk/clerk-react"

export const useUserSettings = () => {
	const { openUserProfile } = useClerk()

	const handleOpenUserSettings = () => {
		openUserProfile()
	}

	return {
		handleOpenUserSettings,
	}
}
