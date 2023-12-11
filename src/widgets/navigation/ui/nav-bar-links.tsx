import { useLocation } from "react-router-dom"
import { NavigationLink } from "@/shared/ui/links"
import { cn } from "@/shared/ui/util.ts"
import { navBarLinksData } from "../constants/nav-bar-links-data.ts"

type NavBarLinksProps = {
	className?: string
	onItemClick?: () => void
}

export const NavBarLinks = ({ className, onItemClick }: NavBarLinksProps) => {
	const { pathname } = useLocation()

	return (
		<ul className={cn("flex flex-col items-center gap-10 md:flex-row", className)}>
			{navBarLinksData.map(linkData => (
				<li key={linkData.href} onClick={onItemClick}>
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
