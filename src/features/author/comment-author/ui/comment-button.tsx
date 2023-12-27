import { MessageSquareIcon } from "lucide-react"
import { Link } from "react-router-dom"
import { Doc } from "@convex/_generated/dataModel"
import { ROUTES } from "@/shared/constants/routes.ts"
import { Button } from "@/shared/ui/button.tsx"

type CommentButtonProps = {
	author: Doc<"authors">
}

export const CommentButton = ({ author }: CommentButtonProps) => {
	return (
		<Button variant={"outline"} className={"flex h-fit items-center gap-2 py-1"} asChild>
			<Link to={ROUTES.AUTHOR(author._id)}>
				<MessageSquareIcon className={"h-5 w-5 shrink-0"} />
				<span className={"pb-1 text-base leading-none"}>{author.comments.length}</span>
			</Link>
		</Button>
	)
}
