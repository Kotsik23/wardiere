import { SignInButton, SignUpButton } from "@clerk/clerk-react"
import { Button } from "@/shared/ui/button.tsx"
import { cn } from "@/shared/ui/util.ts"

type NavBarActionButtonsProps = {
	className?: string
	onButtonClick?: () => void
}

export const ActionButtons = ({ className, onButtonClick }: NavBarActionButtonsProps) => {
	return (
		<div className={cn("flex flex-col items-center gap-5 md:flex-row", className)}>
			<SignUpButton mode={"modal"}>
				<Button variant={"outline"} className={"w-full"} onClick={onButtonClick}>
					Sign Up
				</Button>
			</SignUpButton>
			<SignInButton mode={"modal"}>
				<Button className={"w-full"} onClick={onButtonClick}>
					Sign In
				</Button>
			</SignInButton>
		</div>
	)
}
