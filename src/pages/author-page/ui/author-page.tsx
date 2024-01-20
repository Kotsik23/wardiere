import { useUser } from "@clerk/clerk-react"
import { ContactIcon, GalleryHorizontalEndIcon, MessageSquareIcon, UsersIcon } from "lucide-react"
import { useParams } from "react-router-dom"
import { Id } from "@convex/_generated/dataModel"
import { PortfoliosHeader, PortfoliosList, SimilarAuthors } from "@/widgets/author"
import { CommentList, CreateCommentForm } from "@/features/author/comment-author"
import { LikeButton } from "@/features/author/like-author"
import {
	AboutText,
	AuthorPhoto,
	Brand,
	Contacts,
	Keyword,
	KeywordsWrapper,
	SwitchEditButton,
	useGetAuthorById,
	useIsOwner,
} from "@/entities/author"
import { ROUTES } from "@/shared/constants/routes.ts"
import { AuthRequiredAlert } from "@/shared/ui/alerts/auth-required-alert.tsx"
import { OwnerAlert } from "@/shared/ui/alerts/owner-alert.tsx"
import { Breadcrumbs } from "@/shared/ui/breadcrumbs.tsx"
import { PageLayout } from "@/shared/ui/layouts"
import { ScreenLoader } from "@/shared/ui/loaders"
import { SectionHeading } from "@/shared/ui/section-heading.tsx"
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
		<>
			<Breadcrumbs
				className={"container mt-6"}
				pages={[
					{ name: "Explore", href: ROUTES.EXPLORE },
					{
						name: author.brand || `Author-${author._id}`,
						href: ROUTES.AUTHOR(author._id),
						currentPage: true,
					},
				]}
			/>
			<PageLayout className={cn("container my-8 flex flex-col gap-6")}>
				{isOwner && (
					<div className={"flex w-full items-center justify-end"}>
						<SwitchEditButton authorId={author._id} editable={false} />
					</div>
				)}
				<Brand brand={author.brand} />
				<div className={"flex w-full flex-col items-center gap-4"}>
					<AuthorPhoto author={author} imageClassName={"max-sm:w-72"} />
					<LikeButton authorId={author._id} />
				</div>
				{author.aboutText && (
					<div className={"flex flex-col items-center gap-6"}>
						<SectionHeading
							title={"About Me"}
							containerClassName={"justify-center w-full"}
							titleClassName={"text-2xl md:text-4xl lg:text-5xl"}
						/>
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
					<SectionHeading
						title={"Portfolios"}
						icon={GalleryHorizontalEndIcon}
						containerClassName={"justify-center w-full"}
						titleClassName={"text-2xl md:text-4xl lg:text-5xl"}
						iconClassName={"text-orange-500 dark:text-orange-400"}
					/>
					<PortfoliosHeader authorId={author._id} onlyExists />
					<PortfoliosList authorId={author._id} />
				</div>

				<div className={"my-6 flex flex-col items-start gap-6"}>
					<SectionHeading
						title={"Contacts"}
						icon={ContactIcon}
						containerClassName={"justify-center w-full"}
						titleClassName={"text-2xl md:text-4xl lg:text-5xl"}
						iconClassName={"text-violet-500 dark:text-violet-400"}
					/>
					<Contacts contacts={author.contacts} />
				</div>

				<div className={"flex flex-col items-start gap-6"}>
					<SectionHeading
						title={"Comments"}
						icon={MessageSquareIcon}
						iconClassName={"text-pink-500 dark:text-pink-400"}
					/>
					{isOwner && <OwnerAlert />}
					{!user && <AuthRequiredAlert />}
					{!isOwner && user && (
						<CreateCommentForm authorId={author._id} className={"flex-row"} />
					)}
					<CommentList authorId={author._id} />
				</div>
				<div className={"flex flex-col items-start gap-6"}>
					<SectionHeading
						title={"You may also like"}
						icon={UsersIcon}
						iconClassName={"text-emerald-500 dark:text-emerald-400"}
					/>
					<SimilarAuthors authorId={author._id} />
				</div>
			</PageLayout>
		</>
	)
}
