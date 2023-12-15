import { useUser } from "@clerk/clerk-react"

export const useLiked = (likes: string[]) => {
	const { user } = useUser()
	if (!user) {
		return false
	}

	return likes.includes(user.id)
}
