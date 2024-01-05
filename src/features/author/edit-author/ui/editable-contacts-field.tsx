import { ChangeEvent, FormEvent, useState } from "react"
import { useUpdateEffect } from "usehooks-ts"
import { Doc, Id } from "@convex/_generated/dataModel"
import { getContactsIcons } from "@/entities/author"
import { Button } from "@/shared/ui/button.tsx"
import { Input } from "@/shared/ui/input.tsx"
import { useEditable } from "../model/use-editable.ts"

type Props = {
	authorId: Id<"authors">
	contacts: Doc<"authors">["contacts"]
	field: keyof Doc<"authors">["contacts"]
	fieldValue: string
}

export const EditableContactsField = ({ authorId, field, fieldValue, contacts }: Props) => {
	const icons = getContactsIcons()

	const { handleUpdate } = useEditable()
	const [inputValue, setInputValue] = useState<string>(fieldValue ? fieldValue : "")

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value)
	}

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		handleUpdate({
			authorId,
			payload: {
				contacts: {
					...contacts,
					[field]: inputValue,
				},
			},
		})
	}

	useUpdateEffect(() => {
		setInputValue(fieldValue)
	}, [fieldValue])

	return (
		<div className={"flex w-full items-center gap-4"}>
			{icons[field]}
			<form className={"flex w-full items-center gap-4"} onSubmit={handleSubmit}>
				<Input
					className={"text-base"}
					placeholder={"Enter your value here..."}
					value={inputValue}
					onChange={handleChange}
				/>
				<Button type={"submit"} className={"shrink-0"} disabled={inputValue === fieldValue}>
					Save
				</Button>
			</form>
		</div>
	)
}
