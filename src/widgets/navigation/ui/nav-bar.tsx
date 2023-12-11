import { SignInButton, SignUpButton } from "@clerk/clerk-react"
import { Authenticated, Unauthenticated } from "convex/react"
import { ROUTES } from "@/shared/constants/routes.ts"
import { Button } from "@/shared/ui/button.tsx"
import { NavigationLink } from "@/shared/ui/links"
import { Logo } from "@/shared/ui/logo.tsx"
import { NavBarLinks } from "./nav-bar-links.tsx"
import { UserButton } from "./user-button.tsx"

export const NavBar = () => {
	return (
		<header
			className={
				"fixed left-0 right-0 top-0 w-full border-b border-b-border bg-background/80 backdrop-blur"
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
					<Unauthenticated>
						<div className={"flex items-center gap-5"}>
							<SignUpButton mode={"modal"}>
								<Button variant={"ghost"}>Sign Up</Button>
							</SignUpButton>
							<SignInButton mode={"modal"}>
								<Button>Sign In</Button>
							</SignInButton>
						</div>
					</Unauthenticated>
				</nav>
			</div>
		</header>
	)
}
