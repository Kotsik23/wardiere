import { useUser } from "@clerk/clerk-react"
import { LightbulbIcon, LogOutIcon, SettingsIcon } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useAuthorButton } from "@/features/author/navigate-author"
import { ThemeSwitcher } from "@/features/toggle-theme"
import { ROUTES } from "@/shared/constants/routes.ts"
import { useSignOut } from "../../model/use-sign-out.ts"
import { MobileMenuAction } from "./mobile-menu-action.tsx"

type MobileMenuActionsProps = {
	onClose: () => void
}

export const MobileMenuActions = ({ onClose }: MobileMenuActionsProps) => {
	const { handleSignOut } = useSignOut()
	const { handleClick } = useAuthorButton()
	const navigate = useNavigate()
	const { user } = useUser()

	const withClose = (fn: () => void) => {
		fn()
		onClose()
	}

	return (
		<div className={"mt-4 flex flex-col gap-4"}>
			<MobileMenuAction
				label={"Settings"}
				icon={SettingsIcon}
				onClick={() => withClose(() => navigate(ROUTES.SETTINGS))}
			/>
			<MobileMenuAction
				label={"Author"}
				icon={LightbulbIcon}
				onClick={() => withClose(() => handleClick({ userId: user?.id }))}
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
