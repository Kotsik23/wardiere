import { useUser } from "@clerk/clerk-react"
import { ChangeEvent, useState } from "react"
import { useBoolean, useDebounce, useUpdateEffect } from "usehooks-ts"
import { Doc } from "@convex/_generated/dataModel"
import { CompletionButton } from "@/entities/author"
import { Textarea } from "@/shared/ui/textarea.tsx"
import { BrandCompletionType } from "../model/types.ts"
import { useBrandCompletion } from "../model/use-brand-completion.ts"
import { useEditable } from "../model/use-editable.ts"
import { ChooseBrandCompletion } from "./choose-brand-completion.tsx"

type EditableBrandProps = {
	author: Doc<"author">
}

export const EditableBrand = ({ author }: EditableBrandProps) => {
	const { value: open, setValue: onOpenChange, toggle } = useBoolean()
	const { handleUpdate } = useEditable()
	const { handleCompletion, isPending } = useBrandCompletion()
	const { user } = useUser()
	const [brandValue, setBrandValue] = useState<string | undefined>(author.brand)
	const [brandCompletions, setBrandCompletions] = useState<BrandCompletionType>({ brands: [] })
	const debouncedBrandValue = useDebounce(brandValue, 400)

	const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setBrandValue(e.target.value)
	}

	const handleCompletionEnd = (data: BrandCompletionType) => {
		setBrandCompletions(data)
		toggle()
	}

	const handleChoose = (selected: string) => {
		toggle()
		setBrandValue(selected)
		handleUpdate({ authorId: author._id, payload: { brand: selected } })
	}

	useUpdateEffect(() => {
		handleUpdate({ authorId: author._id, payload: { brand: debouncedBrandValue } })
	}, [debouncedBrandValue])

	return (
		<>
			<div className={"relative w-full"}>
				<Textarea
					placeholder={"Your brand here..."}
					value={brandValue}
					onChange={handleChange}
					className={
						"my-8 resize-none text-center text-3xl font-bold italic sm:text-5xl md:text-6xl lg:text-7xl xl:text-9xl"
					}
				/>
				<CompletionButton
					completionFn={() =>
						handleCompletion({
							onCompletionEnd: handleCompletionEnd,
							args: { username: user!.username! },
						})
					}
					isPending={isPending}
					className={"absolute -right-2 top-2"}
				/>
			</div>

			<ChooseBrandCompletion
				open={open}
				onOpenChange={onOpenChange}
				completions={brandCompletions}
				onChoose={handleChoose}
			/>
		</>
	)
}
