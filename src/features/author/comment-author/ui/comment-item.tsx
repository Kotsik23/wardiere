import { useUser } from "@clerk/clerk-react"
import { Doc } from "@convex/_generated/dataModel"
import { Card } from "@/shared/ui/card.tsx"
import { formatTimeAgo } from "../lib/formatDate.ts"
import { DeleteComment } from "./delete-comment.tsx"

type Props = {
	comment: Doc<"comments">
}

export const CommentItem = ({ comment }: Props) => {
	const { user } = useUser()

	return (
		<Card className={"relative flex w-full items-center justify-between p-4"}>
			<p className={"text-lg font-medium"}>{comment.text}</p>
			<span className={"text-sm text-muted-foreground"}>
				{formatTimeAgo(comment._creationTime)}
			</span>
			{comment.clerkUserId === user?.id && (
				<DeleteComment commentId={comment._id} className={"absolute -right-2 -top-2"} />
			)}
		</Card>
	)
}
