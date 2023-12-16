import { useUser } from "@clerk/clerk-react"
import { LightbulbIcon } from "lucide-react"
import { DropdownMenuItem } from "@/shared/ui/dropdown-menu.tsx"
import { useAuthorButton } from "../model/use-author-button.ts"

export const AuthorButton = () => {
	const { user } = useUser()
	const { handleClick } = useAuthorButton()

	return (
		<DropdownMenuItem onClick={() => handleClick({ userId: user?.id })}>
			<LightbulbIcon className={"mr-2 h-5 w-5"} />
			Author
		</DropdownMenuItem>
	)
}
