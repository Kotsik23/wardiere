import { TrashIcon } from "lucide-react"
import { useBoolean } from "usehooks-ts"
import { Id } from "@convex/_generated/dataModel"
import { Button } from "@/shared/ui/button.tsx"
import { ConfirmationDialog } from "@/shared/ui/confirmation"
import { useDeleteComment } from "../model/use-delete-comment.ts"

type Props = {
	authorId: Id<"authors">
	commentId: Id<"comments">
}

export const DeleteComment = ({ commentId, authorId }: Props) => {
	const { value: open, setValue: onOpenChange, toggle } = useBoolean()
	const { handleDelete, isPending } = useDeleteComment()

	const handleConfirm = async () => {
		await handleDelete({ commentId, authorId })
	}

	return (
		<>
			<Button
				variant={"ghost"}
				size={"icon"}
				className={"h-8 w-8 text-muted-foreground hover:text-destructive"}
				onClick={toggle}
			>
				<TrashIcon className={"h-5 w-5"} />
			</Button>
			<ConfirmationDialog
				open={open}
				onOpenChange={onOpenChange}
				onConfirm={handleConfirm}
				isPending={isPending}
				title={"Confirmation"}
				description={"Do you really wand to delete your comment?"}
			/>
		</>
	)
}
