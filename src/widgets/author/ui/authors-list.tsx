import { Doc } from "@convex/_generated/dataModel"
import { AuthorCard } from "@/entities/author"

type AuthorsListProps = {
	authors: Doc<"authors">[]
}

export const AuthorsList = ({ authors }: AuthorsListProps) => {
	return (
		<section
			className={"grid w-full grid-flow-row-dense grid-cols-1 items-start gap-8 xl:grid-cols-2"}
		>
			{authors.map(author => (
				<AuthorCard key={author._id} author={author} />
			))}
		</section>
	)
}
