import { useUser } from "@clerk/clerk-react"
import { Doc, Id } from "@convex/_generated/dataModel"
import { Card } from "@/shared/ui/card.tsx"
import { formatTimeAgo } from "../lib/formatDate.ts"
import { DeleteComment } from "./delete-comment.tsx"

type Props = {
	authorId: Id<"author">
	comment: Doc<"comments">
}

export const CommentItem = ({ comment, authorId }: Props) => {
	const { user } = useUser()

	return (
		<Card className={"w-full"}>
			<div className={"flex flex-col gap-2 p-4"}>
				<div className={"flex items-baseline justify-between"}>
					<p className={"text-lg font-medium"}>{comment.text}</p>
					{comment.userId === user?.id && (
						<DeleteComment commentId={comment._id} authorId={authorId} />
					)}
				</div>
				<span className={"self-end text-sm text-muted-foreground"}>
					{formatTimeAgo(comment._creationTime)}
				</span>
			</div>
		</Card>
	)
}
