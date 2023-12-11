import { Authenticated, Unauthenticated } from "convex/react"
import { LightbulbIcon, LogOutIcon, MenuIcon, SettingsIcon } from "lucide-react"
import { useBoolean } from "usehooks-ts"
import { ThemeSwitcher } from "@/features/theme-switcher"
import { ROUTES } from "@/shared/constants/routes.ts"
import { Button } from "@/shared/ui/button.tsx"
import { NavigationLink } from "@/shared/ui/links"
import { Logo } from "@/shared/ui/logo.tsx"
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "@/shared/ui/sheet.tsx"
import { useSignOut } from "../../model/use-sign-out.ts"
import { useUserSettings } from "../../model/use-user-settings.ts"
import { ActionButtons } from "../action-buttons.tsx"
import { NavBarLinks } from "../nav-bar-links.tsx"
import { MobileMenuAction } from "./mobile-menu-action.tsx"

export const MobileMenu = () => {
	const { value: open, setValue: setOpen, setFalse: onClose } = useBoolean()
	const { handleOpenUserSettings } = useUserSettings()
	const { handleSignOut } = useSignOut()

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>
				<Button variant={"ghost"} size={"icon"}>
					<MenuIcon className={"h-8 w-8"} />
				</Button>
			</SheetTrigger>
			<SheetContent side={"bottom"} className={"rounded-t-3xl"}>
				<SheetHeader className={"mb-8"}>
					<NavigationLink to={ROUTES.HOME} className={"w-fit self-center"} onClick={onClose}>
						<Logo />
					</NavigationLink>
				</SheetHeader>
				<NavBarLinks className={"items-start gap-4"} onItemClick={onClose} />
				<Authenticated>
					<div className={"mt-4 flex flex-col gap-4"}>
						<MobileMenuAction
							label={"Settings"}
							icon={SettingsIcon}
							onClick={() => {
								handleOpenUserSettings()
								onClose()
							}}
						/>
						<MobileMenuAction
							label={"Author"}
							icon={LightbulbIcon}
							onClick={() => {
								onClose()
							}}
						/>
						<MobileMenuAction
							className={"text-destructive hover:text-destructive"}
							label={"Sign Out"}
							icon={LogOutIcon}
							onClick={() => {
								handleSignOut()
								onClose()
							}}
						/>
						<ThemeSwitcher containerClassName={"mt-4"} />
					</div>
				</Authenticated>
				<Unauthenticated>
					<ActionButtons className={"mt-8 gap-2"} onButtonClick={onClose} />
				</Unauthenticated>
			</SheetContent>
		</Sheet>
	)
}
