export const useIsOwner = ({
	userId,
	authorUserId,
}: {
	userId: string | undefined
	authorUserId: string
}) => {
	if (!userId) {
		return false
	}
	return userId === authorUserId
}
