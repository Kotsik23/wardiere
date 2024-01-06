import { ChangeEvent, useEffect, useState } from "react"
import { useDebounce, useUpdateEffect } from "usehooks-ts"
import { Doc } from "@convex/_generated/dataModel"
import { Textarea } from "@/shared/ui/textarea.tsx"
import { useEditable } from "../model/use-editable.ts"

type EditableAboutTextProps = {
	author: Doc<"authors">
}

export const EditableAboutText = ({ author }: EditableAboutTextProps) => {
	const { handleUpdate } = useEditable()
	const [aboutTextValue, setAboutTextValue] = useState<string | undefined>(author.aboutText)
	const debouncedAboutTextValue = useDebounce(aboutTextValue, 800)

	const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setAboutTextValue(e.target.value)
	}

	useUpdateEffect(() => {
		handleUpdate({ authorId: author._id, payload: { aboutText: debouncedAboutTextValue } })
	}, [debouncedAboutTextValue])

	useEffect(() => {
		setAboutTextValue(author.aboutText)
	}, [author.aboutText])

	return (
		<Textarea
			placeholder={"Your about text here..."}
			value={aboutTextValue}
			onChange={handleChange}
			className={
				"mx-auto max-w-4xl text-balance text-justify text-base font-medium md:text-lg lg:text-xl"
			}
			minRows={6}
			maxRows={12}
		/>
	)
}
