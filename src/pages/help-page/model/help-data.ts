import { ROUTES } from "@/shared/constants/routes.ts"

type HelpDataType = {
	image: string
	title: string
	href: string
}

export const helpData: HelpDataType[] = [
	{
		title: "Security",
		image: "https://ik.imagekit.io/k3z5s13bx/wardiere-support/composition-17.png",
		href: ROUTES.HELP_SECURITY,
	},
	{
		title: "Your account",
		image: "https://ik.imagekit.io/k3z5s13bx/wardiere-support/composition-14.png",
		href: ROUTES.HELP_YOUR_ACCOUNT,
	},
	{
		title: "Wardiere Dzen",
		image: "https://ik.imagekit.io/k3z5s13bx/wardiere-support/composition-7.png",
		href: ROUTES.HELP_WARDIERE_DZEN,
	},
]
