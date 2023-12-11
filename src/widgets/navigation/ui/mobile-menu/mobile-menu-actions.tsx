import { LightbulbIcon, LogOutIcon, SettingsIcon } from "lucide-react"
import { ThemeSwitcher } from "@/features/theme-switcher"
import { useSignOut } from "../../model/use-sign-out.ts"
import { useUserSettings } from "../../model/use-user-settings.ts"
import { MobileMenuAction } from "./mobile-menu-action.tsx"

type MobileMenuActionsProps = {
	onClose: () => void
}

export const MobileMenuActions = ({ onClose }: MobileMenuActionsProps) => {
	const { handleOpenUserSettings } = useUserSettings()
	const { handleSignOut } = useSignOut()

	const withClose = (fn: () => void) => {
		fn()
		onClose()
	}

	return (
		<div className={"mt-4 flex flex-col gap-4"}>
			<MobileMenuAction
				label={"Settings"}
				icon={SettingsIcon}
				onClick={() => withClose(handleOpenUserSettings)}
			/>
			<MobileMenuAction
				label={"Author"}
				icon={LightbulbIcon}
				onClick={() => withClose(() => {})}
			/>
			<MobileMenuAction
				className={"text-destructive hover:text-destructive"}
				label={"Sign Out"}
				icon={LogOutIcon}
				onClick={() => withClose(handleSignOut)}
			/>
			<ThemeSwitcher containerClassName={"mt-4"} />
		</div>
	)
}
