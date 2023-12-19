import { useUser } from "@clerk/clerk-react"
import { Navigate, useParams } from "react-router-dom"
import { Id } from "@convex/_generated/dataModel"
import { EditableAboutText, EditableBrand } from "@/features/author/edit-author"
import { TogglePubic } from "@/features/author/toggle-public"
import { useGetAuthorById, useIsOwner } from "@/entities/author"
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
		<PageLayout className={"container flex flex-col"}>
			<TogglePubic author={author} />

			<EditableBrand author={author} />
			<div className={"mt-4 flex flex-col items-center gap-3"}>
				<h2 className={"text-2xl font-semibold capitalize md:text-4xl lg:text-5xl"}>
					About Me
				</h2>
				<EditableAboutText author={author} />
			</div>
		</PageLayout>
	)
}
