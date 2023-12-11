import { LogOutIcon } from "lucide-react"
import { DropdownMenuItem } from "@/shared/ui/dropdown-menu.tsx"
import { useSignOut } from "../model/use-sign-out.ts"

export const SignOut = () => {
	const { handleSignOut } = useSignOut()

	return (
		<DropdownMenuItem
			className={"text-destructive focus:bg-destructive/10 focus:text-destructive"}
			onClick={handleSignOut}
		>
			<LogOutIcon className={"mr-2 h-5 w-5"} />
			Sign Out
		</DropdownMenuItem>
	)
}
