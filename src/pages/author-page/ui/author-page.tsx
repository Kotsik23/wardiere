import { useParams } from "react-router-dom"
import { Id } from "@convex/_generated/dataModel"
import { AboutText, Brand, useGetAuthorById } from "@/entities/author"
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
			<Brand brand={author.brand} />
			<div className={"mt-4 flex flex-col items-center gap-3"}>
				<h2 className={"text-2xl font-semibold capitalize md:text-4xl lg:text-5xl"}>
					About Me
				</h2>
				<AboutText aboutText={author.aboutText} />
			</div>
		</PageLayout>
	)
}
