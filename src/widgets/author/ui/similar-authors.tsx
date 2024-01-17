import { useEffect, useState } from "react"
import { Doc, Id } from "@convex/_generated/dataModel"
import { useGetSimilarAuthors } from "@/entities/author"
import { AuthorsList } from "./authors-list.tsx"

type Props = {
	authorId: Id<"authors">
}

export const SimilarAuthors = ({ authorId }: Props) => {
	const [authors, setAuthors] = useState<Doc<"authors">[]>([])
	const getSimilar = useGetSimilarAuthors()

	useEffect(() => {
		const fetchAuthors = async () => {
			const res = await getSimilar({ authorId })
			const existsAuthors = res.filter(a => a !== null)
			setAuthors(existsAuthors as Doc<"authors">[])
		}

		fetchAuthors()
	}, [authorId, getSimilar])

	return authors.length > 0 ? (
		<AuthorsList authors={authors} className={"lg:grid-cols-2"} />
	) : (
		<AuthorsList.Skeleton count={4} />
	)
}
