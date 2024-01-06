import { UserJSON } from "@clerk/backend"
import { useUser } from "@clerk/clerk-react"
import { Doc } from "@convex/_generated/dataModel"
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar.tsx"
import { Card } from "@/shared/ui/card.tsx"
import { formatTimeAgo } from "../lib/formatDate.ts"
import { DeleteComment } from "./delete-comment.tsx"

type Props = {
	data: {
		comment: Doc<"comments">
		user: UserJSON
	}
}

export const CommentItem = ({ data }: Props) => {
	const { user } = useUser()

	return (
		<Card className={"relative flex flex-col gap-4 p-4"}>
			<div className={"flex items-center gap-2"}>
				<Avatar>
					<AvatarImage src={data.user.image_url} className={"object-cover"} />
					<AvatarFallback>{data.user.username?.at(0)}</AvatarFallback>
				</Avatar>
				<p>@{data.user.username}</p>
				<span className={"text-sm text-muted-foreground"}>
					• {formatTimeAgo(data.comment._creationTime)}
				</span>
			</div>
			<p className={"text-base font-medium md:text-lg"}>{data.comment.text}</p>
			{data.comment.clerkUserId === user?.id && (
				<DeleteComment commentId={data.comment._id} className={"absolute -right-2 -top-2"} />
			)}
		</Card>
	)
}
