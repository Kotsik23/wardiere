import { useUser } from "@clerk/clerk-react"
import { Navigate, useParams } from "react-router-dom"
import { Id } from "@convex/_generated/dataModel"
import {
	PortfoliosHeader,
	PortfoliosList,
	UploadAuthorPhotoButton,
	UploadAuthorPortfolioButton,
} from "@/widgets/author"
import { CommentList } from "@/features/author/comment-author"
import { AboutTextCompletionButton, BrandCompletionButton } from "@/features/author/completions"
import {
	CreateKeyword,
	EditableAboutText,
	EditableBrand,
	EditableContacts,
	EditableKeywords,
} from "@/features/author/edit-author"
import { LikeButton } from "@/features/author/like-author"
import { TogglePubic } from "@/features/author/toggle-public"
import { AuthorPhoto, useGetAuthorById, useIsOwner } from "@/entities/author"
import { ROUTES } from "@/shared/constants/routes.ts"
import { Breadcrumbs } from "@/shared/ui/breadcrumbs.tsx"
import { PageLayout } from "@/shared/ui/layouts"
import { ScreenLoader } from "@/shared/ui/loaders"

export const AuthorEditPage = () => {
	const { id: authorId } = useParams()
	const { user } = useUser()
	const author = useGetAuthorById({ authorId: authorId as Id<"authors"> | undefined })
	const isOwner = useIsOwner({ userId: user?.id, authorUserId: author?.userId })

	if (!author) {
		return <ScreenLoader />
	}

	if (!isOwner) {
		return <Navigate to={ROUTES.UNKNOWN} replace />
	}

	return (
		<>
			<Breadcrumbs
				className={"container mt-6"}
				pages={[
					{ name: "Explore", href: ROUTES.EXPLORE },
					{
						name: author.brand || "Author",
						href: ROUTES.AUTHOR_EDIT(author._id),
						currentPage: true,
					},
				]}
			/>
			<PageLayout className={"container my-8 flex flex-col gap-10"}>
				<TogglePubic author={author} />

				<div className={"relative w-full"}>
					<EditableBrand author={author} />
					<BrandCompletionButton
						authorId={author._id}
						className={"absolute -right-3 -top-8"}
					/>
				</div>
				<div className={"flex w-full flex-col items-center gap-4"}>
					<AuthorPhoto author={author} imageClassName={"max-sm:w-72"} />
					<UploadAuthorPhotoButton authorId={author._id} />
					<LikeButton authorId={author._id} />
				</div>
				<div className={"flex flex-col items-center gap-6"}>
					<h2 className={"text-2xl font-semibold capitalize md:text-4xl lg:text-5xl"}>
						About Me
					</h2>
					<div className={"relative w-full max-w-4xl"}>
						<EditableAboutText author={author} />
						<AboutTextCompletionButton
							authorId={author._id}
							className={"absolute -right-3 -top-8"}
						/>
					</div>
				</div>

				<div className={"flex flex-col items-center gap-6"}>
					<CreateKeyword authorId={author._id} keywords={author.keywords} />
					<EditableKeywords authorId={author._id} keywords={author.keywords} />
				</div>

				<div className={"my-6 flex flex-col items-center gap-6"}>
					<h2 className={"text-2xl font-semibold capitalize md:text-4xl lg:text-5xl"}>
						Portfolios
					</h2>
					<UploadAuthorPortfolioButton authorId={author._id} />
					<PortfoliosHeader authorId={author._id} />
					<PortfoliosList authorId={author._id} editable />
				</div>

				<div className={"my-6 flex flex-col items-start gap-6"}>
					<h2
						className={
							"self-center text-2xl font-semibold capitalize md:text-4xl lg:text-5xl"
						}
					>
						Contacts
					</h2>
					<div className={"mx-auto flex w-full max-w-xl flex-col"}>
						<EditableContacts authorId={author._id} contacts={author.contacts} />
					</div>
				</div>

				<div className={"flex flex-col items-start gap-6"}>
					<h2 className={"text-xl font-semibold capitalize md:text-2xl lg:text-3xl"}>
						Comments
					</h2>
					<CommentList authorId={author._id} />
				</div>
			</PageLayout>
		</>
	)
}
