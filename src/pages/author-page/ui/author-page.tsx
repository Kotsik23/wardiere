import { useParams } from "react-router-dom"
import { Id } from "@convex/_generated/dataModel"
import { TogglePubic } from "@/features/author"
import { useGetAuthorById } from "@/entities/author"
import { PageLayout } from "@/shared/ui/layouts"
import { Spinner } from "@/shared/ui/spinner.tsx"

export const AuthorPage = () => {
	const { id: authorId } = useParams()
	const author = useGetAuthorById({ authorId: authorId as Id<"author"> | undefined })

	if (!author) {
		return (
			<div className={"grid h-screen place-items-center"}>
				<Spinner className={"h-12 w-12"} />
			</div>
		)
	}

	return (
		<PageLayout>
			<TogglePubic author={author} />
			<p>Author page</p>
		</PageLayout>
	)
}
