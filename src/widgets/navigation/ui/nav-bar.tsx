import { SignInButton } from "@clerk/clerk-react"
import { Authenticated, Unauthenticated } from "convex/react"
import { ROUTES } from "@/shared/constants/routes.ts"
import { Button } from "@/shared/ui/button.tsx"
import { NavigationLink } from "@/shared/ui/links"
import { Logo } from "@/shared/ui/logo.tsx"
import { UserButton } from "./user-button.tsx"

export const NavBar = () => {
	return (
		<header
			className={
				"fixed left-0 right-0 top-0 w-full border-b border-b-border bg-background/80 backdrop-blur"
			}
		>
			<div className={"container flex items-center justify-between py-4"}>
				<NavigationLink to={ROUTES.HOME} className={"w-full max-w-[10rem]"}>
					<Logo />
				</NavigationLink>
				<Authenticated>
					<UserButton />
				</Authenticated>
				<Unauthenticated>
					<SignInButton mode={"modal"}>
						<Button>Sign In</Button>
					</SignInButton>
				</Unauthenticated>
			</div>
		</header>
	)
}
