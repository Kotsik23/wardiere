import { Authenticated, Unauthenticated } from "convex/react"
import { MenuIcon } from "lucide-react"
import { useBoolean } from "usehooks-ts"
import { ROUTES } from "@/shared/constants/routes.ts"
import { Button } from "@/shared/ui/button.tsx"
import { NavigationLink } from "@/shared/ui/links"
import { Logo } from "@/shared/ui/logo.tsx"
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "@/shared/ui/sheet.tsx"
import { ActionButtons } from "../action-buttons.tsx"
import { NavBarLinks } from "../nav-bar-links.tsx"
import { MobileMenuActions } from "./mobile-menu-actions.tsx"

export const MobileMenu = () => {
	const { value: open, setValue: setOpen, setFalse: onClose } = useBoolean()

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
					<MobileMenuActions onClose={onClose} />
				</Authenticated>
				<Unauthenticated>
					<ActionButtons className={"mt-8 gap-2"} onButtonClick={onClose} />
				</Unauthenticated>
			</SheetContent>
		</Sheet>
	)
}
