import { XIcon } from "lucide-react"
import { useBoolean } from "usehooks-ts"
import { Id } from "@convex/_generated/dataModel"
import { Button } from "@/shared/ui/button.tsx"
import { ConfirmationDialog } from "@/shared/ui/confirmation"
import { cn } from "@/shared/ui/util.ts"
import { useDeleteComment } from "../model/use-delete-comment.ts"

type Props = {
	commentId: Id<"comments">
	className?: string
}

export const DeleteComment = ({ commentId, className }: Props) => {
	const { value: open, setValue: onOpenChange, toggle } = useBoolean()
	const { handleDelete, isPending } = useDeleteComment()

	const handleConfirm = async () => {
		await handleDelete({ commentId })
	}

	return (
		<>
			<Button size={"icon"} className={cn("h-7 w-7 rounded-full", className)} onClick={toggle}>
				<XIcon className={"h-5 w-5"} />
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
