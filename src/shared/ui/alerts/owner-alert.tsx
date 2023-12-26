import { InfoIcon } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "../alert.tsx"

export const OwnerAlert = () => {
	return (
		<Alert variant={"secondary"}>
			<InfoIcon className={"h-6 w-6"} />
			<AlertTitle>Owner Info</AlertTitle>
			<AlertDescription>You can't write a comment to yourself.</AlertDescription>
		</Alert>
	)
}
