import { GlobeIcon, LifeBuoyIcon } from "lucide-react"
import { ROUTES } from "@/shared/constants/routes.ts"
import { NavBarLinkType } from "../model/types.ts"

export const navBarLinksData: NavBarLinkType[] = [
	{
		label: "Explore",
		href: ROUTES.EXPLORE,
		icon: GlobeIcon,
	},
	{
		label: "Help",
		href: ROUTES.HELP,
		icon: LifeBuoyIcon,
	},
]
