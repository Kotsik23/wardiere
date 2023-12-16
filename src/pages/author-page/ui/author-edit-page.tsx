import { useParams } from "react-router-dom"
import { Id } from "@convex/_generated/dataModel"
import { EditableBrand, TogglePubic } from "@/features/author"
import { useGetAuthorById } from "@/entities/author"
import { PageLayout } from "@/shared/ui/layouts"
import { ScreenLoader } from "@/shared/ui/loaders"

export const AuthorEditPage = () => {
	const { id: authorId } = useParams()
	const author = useGetAuthorById({ authorId: authorId as Id<"author"> | undefined })

	if (!author) {
		return <ScreenLoader />
	}

	return (
		<PageLayout className={"container flex flex-col"}>
			<TogglePubic author={author} />

			<EditableBrand author={author} />
		</PageLayout>
	)
}
