import { useClerk } from "@clerk/clerk-react"

export const useUserSettings = () => {
	const { openUserProfile } = useClerk()

	return {
		handleOpenUserSettings: () => openUserProfile(),
	}
}
