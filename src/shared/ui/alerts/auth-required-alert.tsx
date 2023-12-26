import { AlertCircle } from "lucide-react"
import { ROUTES } from "../../constants/routes.ts"
import { Alert, AlertDescription, AlertTitle } from "../alert.tsx"
import { NavigationLink } from "../links"

export const AuthRequiredAlert = () => {
	return (
		<Alert variant={"destructive"}>
			<AlertCircle className={"h-6 w-6"} />
			<AlertTitle>Warning</AlertTitle>
			<AlertDescription>
				You are not logged in. Please{" "}
				<NavigationLink
					variant={"underline"}
					to={ROUTES.HOME}
					className={"text-sm text-secondary"}
				>
					Sign In
				</NavigationLink>{" "}
				or{" "}
				<NavigationLink
					variant={"underline"}
					to={ROUTES.HOME}
					className={"text-sm text-secondary"}
				>
					Sign Up
				</NavigationLink>{" "}
				to write a comment.
			</AlertDescription>
		</Alert>
	)
}
