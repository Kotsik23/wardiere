import { useParams } from "react-router-dom"
import { Id } from "@convex/_generated/dataModel"
import { CommentList, CreateCommentForm } from "@/features/author/comment-author"
import { AboutText, AuthorPhoto, Brand, useGetAuthorById } from "@/entities/author"
import { PageLayout } from "@/shared/ui/layouts"
import { ScreenLoader } from "@/shared/ui/loaders"
import { cn } from "@/shared/ui/util.ts"

export const AuthorPage = () => {
	const { id: authorId } = useParams()
	const author = useGetAuthorById({ authorId: authorId as Id<"author"> | undefined })

	if (!author) {
		return <ScreenLoader />
	}

	return (
		<PageLayout className={cn("container mb-12 mt-24 flex flex-col gap-10")}>
			<Brand brand={author.brand} />
			<div className={"flex w-full flex-col items-center gap-4"}>
				<AuthorPhoto author={author} />
			</div>
			{author.aboutText && (
				<div className={"flex flex-col items-center gap-6"}>
					<h2 className={"text-2xl font-semibold capitalize md:text-4xl lg:text-5xl"}>
						About Me
					</h2>
					<AboutText aboutText={author.aboutText} />
				</div>
			)}
			<div className={"flex flex-col items-start gap-6"}>
				<h2 className={"text-xl font-semibold capitalize md:text-2xl lg:text-3xl"}>
					Comments ({author.comments.length})
				</h2>
				<CreateCommentForm authorId={author._id} className={"flex-row"} />
				<CommentList author={author} />
			</div>
		</PageLayout>
	)
}
