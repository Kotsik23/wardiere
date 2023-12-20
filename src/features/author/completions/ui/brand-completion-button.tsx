import { useUser } from "@clerk/clerk-react"
import { useState } from "react"
import { useBoolean } from "usehooks-ts"
import { Id } from "@convex/_generated/dataModel"
import { CompletionButton, useUpdateAuthor } from "@/entities/author"
import { cn } from "@/shared/ui/util.ts"
import { BrandCompletionType } from "../model/types.ts"
import { useBrandCompletion } from "../model/use-brand-completion.ts"
import { ChooseBrandCompletion } from "./choose-brand-completion.tsx"

type Props = {
	authorId: Id<"author">
	className?: string
}

export const BrandCompletionButton = ({ authorId, className }: Props) => {
	const { value: open, setValue: onOpenChange, toggle } = useBoolean()
	const { handleCompletion, isPending } = useBrandCompletion()
	const { updateAuthorMutation } = useUpdateAuthor()
	const { user } = useUser()
	const [brandCompletions, setBrandCompletions] = useState<BrandCompletionType>({ brands: [] })

	const handleCompletionEnd = (data: BrandCompletionType) => {
		setBrandCompletions(data)
		toggle()
	}

	const handleChoose = (selected: string) => {
		toggle()
		updateAuthorMutation({ authorId, payload: { brand: selected } })
	}

	const completionFn = () =>
		handleCompletion({
			onCompletionEnd: handleCompletionEnd,
			args: { username: user!.username! },
		})

	return (
		<>
			<CompletionButton
				completionFn={completionFn}
				isPending={isPending}
				className={cn(className)}
			/>
			<ChooseBrandCompletion
				open={open}
				onOpenChange={onOpenChange}
				completions={brandCompletions}
				onChoose={handleChoose}
			/>
		</>
	)
}
