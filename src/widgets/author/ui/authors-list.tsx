import { Doc } from "@convex/_generated/dataModel"
import { AuthorCard } from "@/entities/author"
import { Skeleton } from "@/shared/ui/skeleton.tsx"
import { cn } from "@/shared/ui/util.ts"

type AuthorsListProps = {
	authors: Doc<"authors">[]
	className?: string
}

export const AuthorsList = ({ authors, className }: AuthorsListProps) => {
	return (
		<section
			className={cn(
				"grid w-full grid-cols-1 content-start items-start gap-8 xl:grid-cols-2",
				className
			)}
		>
			{authors.map(author => (
				<AuthorCard key={author._id} author={author} />
			))}
		</section>
	)
}

AuthorsList.Skeleton = ({ count = 8 }: { count?: number }) => {
	return (
		<section className={"grid w-full grid-cols-1 content-start items-start gap-8 xl:grid-cols-2"}>
			{Array.from({ length: count }).map((_, index) => (
				<Skeleton key={`author-card-${index}`} className={"h-96 w-full md:h-80"} />
			))}
		</section>
	)
}
