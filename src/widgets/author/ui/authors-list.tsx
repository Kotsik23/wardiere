import { Doc } from "@convex/_generated/dataModel"
import { CommentButton } from "@/features/author/comment-author"
import { LikeButton } from "@/features/author/like-author"
import { AuthorCard } from "@/entities/author"

type AuthorsListProps = {
	authors: Doc<"author">[]
}

export const AuthorsList = ({ authors }: AuthorsListProps) => {
	return (
		<section
			className={"grid w-full grid-flow-row-dense grid-cols-1 items-start gap-8 xl:grid-cols-2"}
		>
			{authors.map(author => (
				<AuthorCard
					key={author._id}
					data={author}
					actions={
						<div className={"flex items-center gap-4"}>
							<LikeButton author={author} />
							<CommentButton author={author} />
						</div>
					}
				/>
			))}
		</section>
	)
}
