export const useIsOwner = ({
	userId,
	authorUserId,
}: {
	userId: string | undefined
	authorUserId: string | undefined
}) => {
	if (!userId || !authorUserId) {
		return false
	}
	return userId === authorUserId
}
