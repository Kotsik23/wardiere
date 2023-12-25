import { useUser } from "@clerk/clerk-react"
import { AuthorButton } from "@/features/author/navigate-author"
import { ThemeSwitcher } from "@/features/toggle-theme"
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar.tsx"
import {
	DropdownMenu,
	DropdownMenuContent,
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
		<DropdownMenu modal={false}>
			<DropdownMenuTrigger asChild>
				<Avatar
					className={
						"cursor-pointer transition-all hover:ring-2 hover:ring-ring hover:ring-offset-2 hover:ring-offset-background"
					}
				>
					<AvatarImage src={user?.imageUrl} className={"object-cover"} />
					<AvatarFallback>{user?.fullName?.at(0)}</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent className={"w-48"} align={"end"}>
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<UserSettings />
				<AuthorButton />
				<DropdownMenuSeparator />
				<SignOut />
				<DropdownMenuSeparator />
				<ThemeSwitcher containerClassName={"px-2 py-1.5"} />
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
