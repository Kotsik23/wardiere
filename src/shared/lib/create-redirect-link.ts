export const createRedirectLink = ({ pathname, to }: { pathname: string; to: string }) => {
	const encodedTo = encodeURIComponent(to)
	return `${pathname}#/?redirect_url=${encodedTo}`
}
