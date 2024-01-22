export const ROUTES = {
	HOME: "/",
	EXPLORE: "/explore",

	HELP: "/help",
	HELP_SECURITY: "/help/security",
	HELP_YOUR_ACCOUNT: "/help/your-account",
	HELP_WARDIERE_DZEN: "/help/wardiere-dzen",

	SETTINGS: "/settings",
	SIGN_IN: "/auth/sign-in",
	SIGN_UP: "/auth/sign-up",
	AUTHOR: (id: string) => `/author/${id}`,
	AUTHOR_EDIT: (id: string) => `/author/${id}/edit`,

	UNKNOWN: "*",
}
