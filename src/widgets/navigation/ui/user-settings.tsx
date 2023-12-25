import { SettingsIcon } from "lucide-react"
import { Link } from "react-router-dom"
import { ROUTES } from "@/shared/constants/routes.ts"
import { DropdownMenuItem } from "@/shared/ui/dropdown-menu.tsx"

export const UserSettings = () => {
	return (
		<DropdownMenuItem asChild>
			<Link to={ROUTES.SETTINGS}>
				<SettingsIcon className={"mr-2 h-5 w-5"} />
				Settings
			</Link>
		</DropdownMenuItem>
	)
}
