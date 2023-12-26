import { Link } from "react-router-dom"
import { ROUTES } from "@/shared/constants/routes.ts"
import { Button } from "@/shared/ui/button.tsx"
import { cn } from "@/shared/ui/util.ts"

type NavBarActionButtonsProps = {
	className?: string
	onButtonClick?: () => void
}

export const ActionButtons = ({ className, onButtonClick }: NavBarActionButtonsProps) => {
	return (
		<div className={cn("flex flex-col items-center gap-5 md:flex-row", className)}>
			<Button variant={"outline"} className={"w-full"} onClick={onButtonClick} asChild>
				<Link to={ROUTES.SIGN_UP}>Sign Up</Link>
			</Button>
			<Button className={"w-full"} onClick={onButtonClick} asChild>
				<Link to={ROUTES.SIGN_IN}>Sign In</Link>
			</Button>
		</div>
	)
}
