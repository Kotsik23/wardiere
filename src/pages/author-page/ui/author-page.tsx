import { useParams } from "react-router-dom"
import { Id } from "@convex/_generated/dataModel"
import { useGetAuthorById } from "@/entities/author"
import { PageLayout } from "@/shared/ui/layouts"
import { ScreenLoader } from "@/shared/ui/loaders"

export const AuthorPage = () => {
	const { id: authorId } = useParams()
	const author = useGetAuthorById({ authorId: authorId as Id<"author"> | undefined })

	if (!author) {
		return <ScreenLoader />
	}

	return (
		<PageLayout>
			<p>Author page</p>
		</PageLayout>
	)
}
