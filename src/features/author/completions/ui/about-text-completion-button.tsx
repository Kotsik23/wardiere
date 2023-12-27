import { Id } from "@convex/_generated/dataModel"
import { CompletionButton, useUpdateAuthor } from "@/entities/author"
import { cn } from "@/shared/ui/util.ts"
import { AboutTextCompletionType } from "../model/types.ts"
import { useAboutTextCompletion } from "../model/use-about-text-completion.ts"

type Props = {
	authorId: Id<"authors">
	className?: string
}

export const AboutTextCompletionButton = ({ authorId, className }: Props) => {
	const { updateAuthorMutation } = useUpdateAuthor()
	const { handleCompletion, isPending } = useAboutTextCompletion()

	const handleCompletionEnd = async (data: AboutTextCompletionType) => {
		updateAuthorMutation({
			authorId,
			payload: { aboutText: data.aboutText },
		})
	}

	return (
		<CompletionButton
			completionFn={() => handleCompletion(handleCompletionEnd)}
			isPending={isPending}
			className={cn(className)}
		/>
	)
}
