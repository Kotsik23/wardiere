import { Authenticated, AuthLoading, Unauthenticated } from "convex/react"
import { useMediaQuery } from "usehooks-ts"
import { ThemeSwitcher } from "@/features/toggle-theme"
import { ROUTES } from "@/shared/constants/routes.ts"
import { NavigationLink } from "@/shared/ui/links"
import { Logo } from "@/shared/ui/logo.tsx"
import { Skeleton } from "@/shared/ui/skeleton.tsx"
import { ActionButtons } from "./action-buttons.tsx"
import { MobileMenu } from "./mobile-menu/mobile-menu.tsx"
import { NavBarLinks } from "./nav-bar-links.tsx"
import { UserButton } from "./user-button.tsx"

export const NavBar = () => {
	const isMedium = useMediaQuery("(min-width: 768px)")

	return (
		<header
			className={
				"sticky top-0 z-50 w-full border-b border-b-border backdrop-blur supports-[backdrop-filter]:bg-background/80"
			}
		>
			<div className={"container flex items-center justify-between py-4"}>
				<NavigationLink to={ROUTES.HOME} className={"max-w-[10rem]"}>
					<Logo />
				</NavigationLink>
				<nav className={"hidden items-center gap-20 md:flex"}>
					<NavBarLinks />
					<Authenticated>
						<UserButton />
					</Authenticated>
					<AuthLoading>
						<Skeleton className={"size-10 rounded-full"} />
					</AuthLoading>
					<Unauthenticated>
						<div className={"flex items-center gap-5"}>
							<ActionButtons />
							{isMedium && <ThemeSwitcher />}
						</div>
					</Unauthenticated>
				</nav>
				<nav className={"flex gap-2 md:hidden"}>
					<MobileMenu />
				</nav>
			</div>
		</header>
	)
}
