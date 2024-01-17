import { useQuery } from "convex/react"
import { api } from "@convex/_generated/api"
import { Doc, Id } from "@convex/_generated/dataModel"
import { AuthorsList } from "./authors-list.tsx"

type Props = {
	authorId: Id<"authors">
}

export const SimilarAuthors = ({ authorId }: Props) => {
	const similar = useQuery(api.authors.getSimilarAuthors, { authorId })

	if (!similar) {
		return <AuthorsList.Skeleton count={4} />
	}

	return <AuthorsList authors={similar as Doc<"authors">[]} className={"lg:grid-cols-2"} />
}
