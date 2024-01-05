import { useUser } from "@clerk/clerk-react"
import { useParams } from "react-router-dom"
import { Id } from "@convex/_generated/dataModel"
import { PortfoliosHeader, PortfoliosList } from "@/widgets/author"
import { CommentList, CreateCommentForm } from "@/features/author/comment-author"
import { LikeButton } from "@/features/author/like-author"
import {
	AboutText,
	AuthorPhoto,
	Brand,
	Contacts,
	Keyword,
	KeywordsWrapper,
	useGetAuthorById,
	useIsOwner,
} from "@/entities/author"
import { AuthRequiredAlert } from "@/shared/ui/alerts/auth-required-alert.tsx"
import { OwnerAlert } from "@/shared/ui/alerts/owner-alert.tsx"
import { PageLayout } from "@/shared/ui/layouts"
import { ScreenLoader } from "@/shared/ui/loaders"
import { cn } from "@/shared/ui/util.ts"

export const AuthorPage = () => {
	const { id: authorId } = useParams()
	const author = useGetAuthorById({ authorId: authorId as Id<"authors"> | undefined })
	const { user } = useUser()
	const isOwner = useIsOwner({ userId: user?.id, authorUserId: author?.userId })

	if (!author) {
		return <ScreenLoader />
	}

	return (
		<PageLayout className={cn("container my-8 flex flex-col gap-6")}>
			<Brand brand={author.brand} />
			<div className={"flex w-full flex-col items-center gap-4"}>
				<AuthorPhoto author={author} imageClassName={"max-sm:w-72"} />
				<LikeButton authorId={author._id} />
			</div>
			{author.aboutText && (
				<div className={"flex flex-col items-center gap-6"}>
					<h2 className={"text-2xl font-semibold capitalize md:text-4xl lg:text-5xl"}>
						About Me
					</h2>
					<AboutText aboutText={author.aboutText} />
				</div>
			)}
			<div className={"my-6 flex flex-col items-center gap-6"}>
				<KeywordsWrapper>
					{author.keywords.map(keyword => (
						<Keyword
							key={author._id + keyword}
							keyword={keyword}
							className={"h-8 shrink-0 px-4 text-base"}
						/>
					))}
				</KeywordsWrapper>
			</div>

			<div className={"my-6 flex flex-col items-center gap-6"}>
				<h2 className={"text-2xl font-semibold capitalize md:text-4xl lg:text-5xl"}>
					Portfolios
				</h2>
				<PortfoliosHeader />
				<PortfoliosList authorId={author._id} />
			</div>

			<div className={"my-6 flex flex-col items-start gap-6"}>
				<h2 className={"self-center text-2xl font-semibold capitalize md:text-4xl lg:text-5xl"}>
					Contacts
				</h2>
				<Contacts contacts={author.contacts} />
			</div>

			<div className={"flex flex-col items-start gap-6"}>
				<h2 className={"text-xl font-semibold capitalize md:text-2xl lg:text-3xl"}>Comments</h2>
				{isOwner && <OwnerAlert />}
				{!user && <AuthRequiredAlert />}
				{!isOwner && user && <CreateCommentForm authorId={author._id} className={"flex-row"} />}
				<CommentList authorId={author._id} />
			</div>
		</PageLayout>
	)
}
