import { ChangeEvent, useState } from "react"
import { useDebounce, useUpdateEffect } from "usehooks-ts"
import { Doc } from "@convex/_generated/dataModel"
import { CompletionButton } from "@/entities/author"
import { Textarea } from "@/shared/ui/textarea.tsx"
import { useEditable } from "../model/use-editable.ts"
import { AboutTextCompletionType } from "../model/types.ts"
import { useAboutTextCompletion } from "../model/use-about-text-completion.ts"

type EditableAboutTextProps = {
	author: Doc<"author">
}

export const EditableAboutText = ({ author }: EditableAboutTextProps) => {
	const { handleUpdate } = useEditable()
	const { handleCompletion, isPending } = useAboutTextCompletion()
	const [aboutTextValue, setAboutTextValue] = useState<string | undefined>(author.aboutText)
	const debouncedAboutTextValue = useDebounce(aboutTextValue, 800)

	const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setAboutTextValue(e.target.value)
	}

	const handleCompletionEnd = (data: AboutTextCompletionType) => {
		setAboutTextValue(data.aboutText)
		handleUpdate({ authorId: author._id, payload: { aboutText: data.aboutText } })
	}

	useUpdateEffect(() => {
		handleUpdate({ authorId: author._id, payload: { aboutText: debouncedAboutTextValue } })
	}, [debouncedAboutTextValue])

	return (
		<div className={"relative w-full"}>
			<Textarea
				placeholder={"Your about text here..."}
				value={aboutTextValue}
				onChange={handleChange}
				className={"my-2 text-center text-lg font-medium md:text-xl lg:text-2xl"}
				minRows={6}
				maxRows={12}
			/>
			<CompletionButton
				completionFn={() => handleCompletion(handleCompletionEnd)}
				isPending={isPending}
				className={"absolute -right-2 -top-2"}
			/>
		</div>
	)
}
