export const ROUTES = {
	HOME: "/",
	EXPLORE: "/explore",
	HELP: "/help",
	AUTHOR: (id: string) => `/author/${id}`,
	AUTHOR_EDIT: (id: string) => `/author/${id}/edit`,

	UNKNOWN: "*",
}
