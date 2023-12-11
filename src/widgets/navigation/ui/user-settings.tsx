import { SettingsIcon } from "lucide-react"
import { DropdownMenuItem } from "@/shared/ui/dropdown-menu.tsx"
import { useUserSettings } from "../model/use-user-settings.ts"

export const UserSettings = () => {
	const { handleOpenUserSettings } = useUserSettings()

	return (
		<DropdownMenuItem onClick={handleOpenUserSettings}>
			<SettingsIcon className={"mr-2 h-5 w-5"} />
			Settings
		</DropdownMenuItem>
	)
}
