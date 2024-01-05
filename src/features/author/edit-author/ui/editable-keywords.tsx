import { Id } from "@convex/_generated/dataModel"
import { Keyword, KeywordsWrapper } from "@/entities/author"
import { cn } from "@/shared/ui/util.ts"
import { DeleteKeyword } from "./delete-keyword.tsx"

type Props = {
	authorId: Id<"authors">
	keywords: string[]
	containerClassName?: string
	keywordClassName?: string
}

export const EditableKeywords = ({
	authorId,
	keywords,
	containerClassName,
	keywordClassName,
}: Props) => {
	if (keywords.length <= 0) {
		return null
	}

	return (
		<KeywordsWrapper className={containerClassName}>
			{keywords.map(keyword => (
				<Keyword
					key={authorId + keyword}
					keyword={keyword}
					className={cn("h-8 shrink-0 pl-4 text-base", keywordClassName)}
					actions={
						<DeleteKeyword
							authorId={authorId}
							keywords={keywords}
							currentKeyword={keyword}
							className={"ml-2"}
						/>
					}
				/>
			))}
		</KeywordsWrapper>
	)
}
