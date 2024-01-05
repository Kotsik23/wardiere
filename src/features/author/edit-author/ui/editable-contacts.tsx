import { Doc, Id } from "@convex/_generated/dataModel"
import { EditableContactsField } from "./editable-contacts-field.tsx"

type Props = {
	authorId: Id<"authors">
	contacts: Doc<"authors">["contacts"]
}

export const EditableContacts = ({ contacts, authorId }: Props) => {
	return (
		<div className={"mx-auto flex w-full max-w-xl flex-col gap-4"}>
			{Object.entries(contacts).map(([key, value]) => (
				<EditableContactsField
					key={authorId + key}
					authorId={authorId}
					field={key as keyof typeof contacts}
					fieldValue={value}
					contacts={contacts}
				/>
			))}
		</div>
	)
}
