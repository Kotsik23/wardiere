import { Doc } from "@convex/_generated/dataModel"
import { CommentButton, LikeButton } from "@/features/author"
import { AuthorCard } from "@/entities/author"

type AuthorsListProps = {
	authors: Doc<"author">[]
}

export const AuthorsList = ({ authors }: AuthorsListProps) => {
	return (
		<section className={"grid w-full grid-cols-1 items-start gap-8 lg:grid-cols-2"}>
			{authors.map(data => (
				<AuthorCard
					key={data._id}
					data={data}
					actions={
						<div className={"flex items-center gap-4"}>
							<LikeButton />
							<CommentButton />
						</div>
					}
				/>
			))}
		</section>
	)
}
