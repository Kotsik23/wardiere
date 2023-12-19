import { Doc } from "@convex/_generated/dataModel"
import { ScreenLoader } from "@/shared/ui/loaders"
import { useCommentList } from "../model/use-comment-list.ts"
import { CommentItem } from "./comment-item.tsx"

type Props = {
	author: Doc<"author">
}

export const CommentList = ({ author }: Props) => {
	const { comments } = useCommentList({ authorId: author._id })

	if (!comments) {
		return <ScreenLoader containerClassName={"h-[40vh]"} />
	}

	return (
		<div className={"flex w-full flex-col gap-4"}>
			{comments.map(
				comment =>
					comment && <CommentItem key={comment._id} comment={comment} authorId={author._id} />
			)}
		</div>
	)
}
