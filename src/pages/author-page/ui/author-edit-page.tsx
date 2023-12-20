import { useUser } from "@clerk/clerk-react"
import { Navigate, useParams } from "react-router-dom"
import { Id } from "@convex/_generated/dataModel"
import { UploadAuthorPhotoButton } from "@/widgets/author"
import { CommentList } from "@/features/author/comment-author"
import { AboutTextCompletionButton, BrandCompletionButton } from "@/features/author/completions"
import { EditableAboutText, EditableBrand } from "@/features/author/edit-author"
import { TogglePubic } from "@/features/author/toggle-public"
import { AuthorPhoto, useGetAuthorById, useIsOwner } from "@/entities/author"
import { ROUTES } from "@/shared/constants/routes.ts"
import { PageLayout } from "@/shared/ui/layouts"
import { ScreenLoader } from "@/shared/ui/loaders"

export const AuthorEditPage = () => {
	const { id: authorId } = useParams()
	const { user } = useUser()
	const author = useGetAuthorById({ authorId: authorId as Id<"author"> | undefined })
	const isOwner = useIsOwner({ userId: user?.id, authorUserId: author?.userId })

	if (!author) {
		return <ScreenLoader />
	}

	if (!isOwner) {
		return <Navigate to={ROUTES.UNKNOWN} replace />
	}

	return (
		<PageLayout className={"container mb-12 mt-24 flex flex-col gap-10"}>
			<TogglePubic author={author} />

			<div className={"relative w-full"}>
				<EditableBrand author={author} />
				<BrandCompletionButton authorId={author._id} className={"absolute -right-6 -top-6"} />
			</div>
			<div className={"flex w-full flex-col items-center gap-4"}>
				<AuthorPhoto author={author} />
				<UploadAuthorPhotoButton authorId={author._id} />
			</div>
			<div className={"flex flex-col items-center gap-6"}>
				<h2 className={"text-2xl font-semibold capitalize md:text-4xl lg:text-5xl"}>
					About Me
				</h2>
				<div className={"relative w-full max-w-4xl"}>
					<EditableAboutText author={author} />
					<AboutTextCompletionButton
						authorId={author._id}
						className={"absolute -right-6 -top-6"}
					/>
				</div>
			</div>
			<div className={"flex flex-col items-start gap-6"}>
				<h2 className={"text-xl font-semibold capitalize md:text-2xl lg:text-3xl"}>
					Comments ({author.comments.length})
				</h2>
				<CommentList author={author} />
			</div>
		</PageLayout>
	)
}
