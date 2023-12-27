import { Doc } from "@convex/_generated/dataModel"
import { ScreenLoader } from "@/shared/ui/loaders"
import { useCommentList } from "../model/use-comment-list.ts"
import { CommentItem } from "./comment-item.tsx"

type Props = {
	author: Doc<"authors">
}

export const CommentList = ({ author }: Props) => {
	const { comments } = useCommentList({ authorId: author._id })

	if (!comments) {
		return <ScreenLoader containerClassName={"h-[40vh]"} />
	}

	return (
		<div className={"flex w-full flex-col gap-4"}>
			{comments.map(({ comment, user }) => (
				<CommentItem key={comment._id} comment={comment} user={user} authorId={author._id} />
			))}
			{/*<Button*/}
			{/*	variant={"outline"}*/}
			{/*	className={"w-fit self-center"}*/}
			{/*	disabled={query.status === "Exhausted" || query.isLoading}*/}
			{/*	onClick={() => query.loadMore(5)}*/}
			{/*>*/}
			{/*	Load More*/}
			{/*	<Spinner className={cn("ml-2 hidden h-5 w-5", query.isLoading && "block")} />*/}
			{/*</Button>*/}
		</div>
	)
}
