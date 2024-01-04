import { Id } from "@convex/_generated/dataModel"
import { Button } from "@/shared/ui/button.tsx"
import { ScreenLoader } from "@/shared/ui/loaders"
import { Spinner } from "@/shared/ui/spinner.tsx"
import { cn } from "@/shared/ui/util.ts"
import { useCommentList } from "../model/use-comment-list.ts"
import { CommentItem } from "./comment-item.tsx"

type Props = {
	authorId: Id<"authors">
}

export const CommentList = ({ authorId }: Props) => {
	const { query } = useCommentList({ authorId })

	if (!query.results) {
		return <ScreenLoader containerClassName={"h-[40vh]"} />
	}

	return (
		<div className={"flex w-full flex-col gap-4"}>
			{query.results.map(comment => (
				<CommentItem key={comment._id} comment={comment} />
			))}
			{query.results.length > 0 && query.status !== "Exhausted" && (
				<Button
					variant={"outline"}
					className={"w-fit self-center"}
					disabled={query.isLoading}
					onClick={() => query.loadMore(5)}
				>
					Load More
					<Spinner className={cn("ml-2 hidden h-5 w-5", query.isLoading && "block")} />
				</Button>
			)}
		</div>
	)
}
