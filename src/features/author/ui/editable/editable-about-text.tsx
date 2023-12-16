import { ChangeEvent, useState } from "react"
import { useDebounce, useUpdateEffect } from "usehooks-ts"
import { Doc } from "@convex/_generated/dataModel"
import { Textarea } from "@/shared/ui/textarea.tsx"
import { useEditable } from "../../model/use-editable.ts"

type EditableAboutTextProps = {
	author: Doc<"author">
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

	return (
		<Textarea
			placeholder={"Your about text here..."}
			value={aboutTextValue}
			onChange={handleChange}
			className={"my-2 text-center text-lg font-medium md:text-xl lg:text-2xl"}
			minRows={6}
			maxRows={12}
		/>
	)
}
