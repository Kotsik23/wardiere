import { ChevronRightIcon, HomeIcon } from "lucide-react"
import { ReactNode } from "react"
import { useLocation } from "react-router-dom"
import { ROUTES } from "../constants/routes.ts"
import { NavigationLink } from "./links"
import { cn } from "./util.ts"

export type BreadcrumbPageType = {
	name: string
	href: string
	currentPage?: boolean
}

export interface BreadcrumbProps {
	pages: BreadcrumbPageType[]
	className?: string
	listClassName?: string
	children?: ReactNode
}
const Breadcrumbs = ({ pages, className, listClassName, ...props }: BreadcrumbProps) => {
	const { pathname } = useLocation()

	const isActive = (href: string) => {
		return pathname === href
	}

	return (
		<nav className={cn("flex", className)} aria-label={"breadcrumb"} {...props}>
			<ol role={"list"} className={cn("flex items-center space-x-2", listClassName)}>
				<li>
					<div>
						<NavigationLink
							to={ROUTES.HOME}
							className={cn(
								"text-muted-foreground",
								isActive(ROUTES.HOME) && "text-secondary"
							)}
						>
							<HomeIcon className={"size-5 flex-shrink-0"} aria-hidden={"true"} />
							<span className={"sr-only"}>Home</span>
						</NavigationLink>
					</div>
				</li>
				{pages.map(page => (
					<li key={page.href}>
						<div className={"flex items-center"}>
							<ChevronRightIcon
								className={"mr-2 size-5 flex-shrink-0 text-muted-foreground"}
								aria-hidden={"true"}
								role={"presentation"}
							/>

							<NavigationLink
								to={page.href}
								className={cn(
									"font-medium text-muted-foreground",
									isActive(page.href) && "text-secondary"
								)}
								aria-current={isActive(page.href) ? "page" : undefined}
							>
								{page.name}
							</NavigationLink>
						</div>
					</li>
				))}
			</ol>
		</nav>
	)
}

export { Breadcrumbs }
