import { SignInButton, SignUpButton } from "@clerk/clerk-react"
import { useLocation } from "react-router-dom"
import { Button } from "@/shared/ui/button.tsx"
import { cn } from "@/shared/ui/util.ts"

type NavBarActionButtonsProps = {
	className?: string
	onButtonClick?: () => void
}

export const ActionButtons = ({ className, onButtonClick }: NavBarActionButtonsProps) => {
	const { pathname } = useLocation()

	return (
		<div className={cn("flex flex-col items-center gap-5 md:flex-row", className)}>
			<SignUpButton mode={"modal"} afterSignInUrl={pathname} afterSignUpUrl={pathname}>
				<Button variant={"outline"} className={"w-full"} onClick={onButtonClick}>
					Sign Up
				</Button>
			</SignUpButton>
			<SignInButton mode={"modal"} afterSignInUrl={pathname} afterSignUpUrl={pathname}>
				<Button className={"w-full"} onClick={onButtonClick}>
					Sign In
				</Button>
			</SignInButton>
		</div>
	)
}
