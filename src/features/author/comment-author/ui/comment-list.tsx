import { Id } from "@convex/_generated/dataModel"
import { Button } from "@/shared/ui/button.tsx"
import { Skeleton } from "@/shared/ui/skeleton.tsx"
import { Spinner } from "@/shared/ui/spinner.tsx"
import { cn } from "@/shared/ui/util.ts"
import { useCommentList } from "../model/use-comment-list.ts"
import { CommentItem } from "./comment-item.tsx"

type Props = {
	authorId: Id<"authors">
}

export const CommentList = ({ authorId }: Props) => {
	const { query } = useCommentList({ authorId })

	if (!query.results || query.isLoading) {
		return <CommentList.Skeleton />
	}

	return (
		<div className={"flex w-full flex-col gap-4"}>
			{query.results.map(data => (
				<CommentItem key={data.comment._id} data={data} />
			))}
			{query.results.length > 0 && query.status === "CanLoadMore" && (
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

CommentList.Skeleton = () => {
	return Array.from({ length: 7 }).map((_, index) => (
		<Skeleton key={index} className={"h-32 w-full"} />
	))
}
