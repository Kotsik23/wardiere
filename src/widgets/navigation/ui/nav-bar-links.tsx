import { useLocation } from "react-router-dom"
import { NavigationLink } from "@/shared/ui/links"
import { cn } from "@/shared/ui/util.ts"
import { navBarLinksData } from "../constants/nav-bar-links-data.ts"

export const NavBarLinks = () => {
	const { pathname } = useLocation()

	return (
		<ul className={"flex items-center gap-10"}>
			{navBarLinksData.map(linkData => (
				<li key={linkData.href}>
					<NavigationLink
						to={linkData.href}
						className={cn(
							"flex items-center gap-2 font-medium",
							pathname === linkData.href && "text-indigo-500 hover:text-indigo-500/70"
						)}
					>
						<linkData.icon className={"h-5 w-5"} />
						{linkData.label}
					</NavigationLink>
				</li>
			))}
		</ul>
	)
}
