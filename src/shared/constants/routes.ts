export const ROUTES = {
	HOME: "/",
	EXPLORE: "/explore",
	HELP: "/help",
	SETTINGS: "/settings",
	SIGN_IN: "/auth/sign-in",
	SIGN_UP: "/auth/sign-up",
	AUTHOR: (id: string) => `/author/${id}`,
	AUTHOR_EDIT: (id: string) => `/author/${id}/edit`,

	UNKNOWN: "*",
}
