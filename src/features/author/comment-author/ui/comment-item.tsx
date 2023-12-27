import { useUser } from "@clerk/clerk-react"
import { Doc, Id } from "@convex/_generated/dataModel"
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar.tsx"
import { Card } from "@/shared/ui/card.tsx"
import { formatTimeAgo } from "../lib/formatDate.ts"
import { DeleteComment } from "./delete-comment.tsx"

type Props = {
	authorId: Id<"authors">
	comment: Doc<"comments">
	user: Doc<"users"> | null
}

export const CommentItem = ({ comment, user, authorId }: Props) => {
	const { user: currentUser } = useUser()
	if (!user) {
		return null
	}

	return (
		<Card className={"flex min-h-[6rem] w-full justify-between p-4"}>
			<div className={"flex items-start gap-4"}>
				<Avatar>
					<AvatarImage src={user.image_url || undefined} />
					<AvatarFallback>{user.username}</AvatarFallback>
				</Avatar>
				<div className={"flex flex-col items-start"}>
					<p className={"text-lg font-medium"}>{comment.text}</p>
					<span className={"text-sm font-normal text-secondary"}>
						{user.email_addresses[0].email_address}
					</span>
				</div>
			</div>
			<div className={"flex flex-col items-end justify-between gap-4"}>
				{comment.userId === currentUser?.id && (
					<DeleteComment commentId={comment._id} authorId={authorId} />
				)}
				<span className={"mt-auto text-sm text-muted-foreground"}>
					{formatTimeAgo(comment._creationTime)}
				</span>
			</div>
		</Card>
	)
}
