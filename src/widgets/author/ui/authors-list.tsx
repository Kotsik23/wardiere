import { Doc } from "@convex/_generated/dataModel"
import { AuthorCard } from "@/entities/author"
import { Skeleton } from "@/shared/ui/skeleton.tsx"

type AuthorsListProps = {
	authors: Doc<"authors">[]
}

export const AuthorsList = ({ authors }: AuthorsListProps) => {
	return (
		<section className={"grid w-full grid-cols-1 content-start items-start gap-8 xl:grid-cols-2"}>
			{authors.map(author => (
				<AuthorCard key={author._id} author={author} />
			))}
		</section>
	)
}

AuthorsList.Skeleton = () => {
	return (
		<section className={"grid w-full grid-cols-1 content-start items-start gap-8 xl:grid-cols-2"}>
			{Array.from({ length: 8 }).map((_, index) => (
				<Skeleton key={`author-card-${index}`} className={"h-96 w-full md:h-80"} />
			))}
		</section>
	)
}
