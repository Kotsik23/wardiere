import { useUser } from "@clerk/clerk-react"
import { LightbulbIcon } from "lucide-react"
import { ThemeSwitcher } from "@/features/theme-switcher"
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar.tsx"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu.tsx"
import { SignOut } from "./sign-out.tsx"
import { UserSettings } from "./user-settings.tsx"

export const UserButton = () => {
	const { user } = useUser()

	if (!user) {
		return null
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Avatar
					className={
						"cursor-pointer transition-all hover:ring-2 hover:ring-ring hover:ring-offset-2 hover:ring-offset-background"
					}
				>
					<AvatarImage src={user?.imageUrl} />
					<AvatarFallback>{user?.fullName?.at(0)}</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent className={"w-48"} align={"end"}>
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<UserSettings />
				<DropdownMenuItem>
					<LightbulbIcon className={"mr-2 h-5 w-5"} />
					Author
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<SignOut />
				<DropdownMenuSeparator />
				<ThemeSwitcher containerClassName={"px-2 py-1.5"} />
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
