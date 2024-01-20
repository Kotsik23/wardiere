import { FeatherIcon, FlaskRoundIcon } from "lucide-react"
import { Link } from "react-router-dom"
import { Id } from "@convex/_generated/dataModel"
import { ROUTES } from "@/shared/constants/routes.ts"
import { Button } from "@/shared/ui/button.tsx"
import { cn } from "@/shared/ui/util.ts"

type Props = {
	authorId: Id<"authors">
	editable: boolean
	className?: string
}

export const SwitchEditButton = ({ authorId, editable, className }: Props) => {
	return (
		<Button variant={"outline"} asChild className={cn("group", className)}>
			<Link to={editable ? ROUTES.AUTHOR(authorId) : ROUTES.AUTHOR_EDIT(authorId)}>
				{editable ? "Preview" : "Edit"}
				{editable ? (
					<FlaskRoundIcon
						className={
							"ml-2 size-5 rotate-12 text-pink-500 transition-transform group-hover:-rotate-6 dark:text-pink-400"
						}
					/>
				) : (
					<FeatherIcon
						className={
							"ml-2 size-5 -rotate-12 text-blue-500 transition-transform group-hover:rotate-6 dark:text-blue-400"
						}
					/>
				)}
			</Link>
		</Button>
	)
}
