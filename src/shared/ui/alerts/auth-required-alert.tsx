import { AlertCircle } from "lucide-react"
import { useLocation } from "react-router-dom"
import { ROUTES } from "../../constants/routes.ts"
import { createRedirectLink } from "../../lib/create-redirect-link.ts"
import { Alert, AlertDescription, AlertTitle } from "../alert.tsx"
import { NavigationLink } from "../links"

export const AuthRequiredAlert = () => {
	const location = useLocation()

	return (
		<Alert variant={"destructive"}>
			<AlertCircle className={"h-6 w-6"} />
			<AlertTitle>Warning</AlertTitle>
			<AlertDescription>
				You are not logged in. Please{" "}
				<NavigationLink
					variant={"underline"}
					to={createRedirectLink({ pathname: ROUTES.SIGN_IN, to: location.pathname })}
					className={"text-sm text-secondary"}
				>
					Sign In
				</NavigationLink>{" "}
				or{" "}
				<NavigationLink
					variant={"underline"}
					to={createRedirectLink({ pathname: ROUTES.SIGN_UP, to: location.pathname })}
					className={"text-sm text-secondary"}
				>
					Sign Up
				</NavigationLink>{" "}
				to write a comment.
			</AlertDescription>
		</Alert>
	)
}
