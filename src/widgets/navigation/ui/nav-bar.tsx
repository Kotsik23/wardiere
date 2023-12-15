import { Authenticated, Unauthenticated } from "convex/react"
import { useMediaQuery } from "usehooks-ts"
import { ThemeSwitcher } from "@/features/theme-switcher"
import { ROUTES } from "@/shared/constants/routes.ts"
import { NavigationLink } from "@/shared/ui/links"
import { Logo } from "@/shared/ui/logo.tsx"
import { ActionButtons } from "./action-buttons.tsx"
import { MobileMenu } from "./mobile-menu/mobile-menu.tsx"
import { NavBarLinks } from "./nav-bar-links.tsx"
import { UserButton } from "./user-button.tsx"

export const NavBar = () => {
	const isMedium = useMediaQuery("(min-width: 768px)")

	return (
		<header
			className={
				"fixed left-0 right-0 top-0 z-50 w-full border-b border-b-border bg-background/80 backdrop-blur"
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
					<div className={"flex items-center gap-5"}>
						<Unauthenticated>
							<ActionButtons />
							{isMedium && <ThemeSwitcher />}
						</Unauthenticated>
					</div>
				</nav>
				<nav className={"flex gap-2 md:hidden"}>
					<MobileMenu />
				</nav>
			</div>
		</header>
	)
}
