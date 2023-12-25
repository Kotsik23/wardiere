import { Authenticated, Unauthenticated } from "convex/react"
import { MenuIcon } from "lucide-react"
import { useBoolean, useMediaQuery } from "usehooks-ts"
import { ThemeSwitcher } from "@/features/toggle-theme"
import { ROUTES } from "@/shared/constants/routes.ts"
import { Button } from "@/shared/ui/button.tsx"
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/shared/ui/drawer.tsx"
import { NavigationLink } from "@/shared/ui/links"
import { Logo } from "@/shared/ui/logo.tsx"
import { ActionButtons } from "../action-buttons.tsx"
import { NavBarLinks } from "../nav-bar-links.tsx"
import { MobileMenuActions } from "./mobile-menu-actions.tsx"

export const MobileMenu = () => {
	const { value: open, setValue: setOpen, setFalse: onClose } = useBoolean()
	const isMedium = useMediaQuery("(min-width: 768px)")

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>
				<Button variant={"ghost"} size={"icon"}>
					<MenuIcon className={"h-8 w-8"} />
				</Button>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader className={"flex justify-center"}>
					<DrawerTitle asChild>
						<NavigationLink to={ROUTES.HOME} className={"w-fit"} onClick={onClose}>
							<Logo />
						</NavigationLink>
					</DrawerTitle>
				</DrawerHeader>
				<div className={"flex flex-col p-4"}>
					<NavBarLinks className={"items-start gap-4"} onItemClick={onClose} />
					<Unauthenticated>
						{!isMedium && <ThemeSwitcher containerClassName={"mt-4"} />}
					</Unauthenticated>
					<Authenticated>
						<MobileMenuActions onClose={onClose} />
					</Authenticated>
					<Unauthenticated>
						<ActionButtons className={"mt-8 gap-2"} onButtonClick={onClose} />
					</Unauthenticated>
				</div>
			</DrawerContent>
		</Drawer>
	)
}
