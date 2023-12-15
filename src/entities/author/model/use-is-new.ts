export const useIsNew = (creationTime: number) => {
	const now = new Date()
	const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())

	return new Date(creationTime) > oneMonthAgo
}
