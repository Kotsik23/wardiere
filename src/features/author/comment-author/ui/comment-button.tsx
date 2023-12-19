import { ArrowRightIcon, MessageSquareIcon } from "lucide-react"
import { Link } from "react-router-dom"
import { useBoolean } from "usehooks-ts"
import { Doc } from "@convex/_generated/dataModel"
import { ROUTES } from "@/shared/constants/routes.ts"
import { Button } from "@/shared/ui/button.tsx"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/shared/ui/dialog.tsx"
import { CreateCommentForm } from "./create-comment-form.tsx"

type CommentButtonProps = {
	author: Doc<"author">
}

export const CommentButton = ({ author }: CommentButtonProps) => {
	const { value: open, setValue: onOpenChange, setFalse: onClose } = useBoolean()

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogTrigger asChild>
				<Button variant={"outline"} className={"flex h-fit items-center gap-2 py-1"}>
					<MessageSquareIcon className={"h-5 w-5 shrink-0"} />
					<span className={"pb-1 text-base leading-none"}>{author.comments.length}</span>
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className={"text-2xl"}>Comment Author</DialogTitle>
					<DialogDescription>What do you think?</DialogDescription>
				</DialogHeader>
				<CreateCommentForm authorId={author._id} afterSubmit={onClose} />
				<DialogFooter>
					<Button variant={"outline"} asChild>
						<Link to={ROUTES.AUTHOR(author._id)}>
							Go to author
							<ArrowRightIcon className={"ml-2 h-5 w-5"} />
						</Link>
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
