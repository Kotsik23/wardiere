import { Doc } from "@convex/_generated/dataModel"
import { getContactsIcons } from "../lib/get-contacts-icons.tsx"

type Props = {
	contacts: Doc<"authors">["contacts"]
}

export const Contacts = ({ contacts }: Props) => {
	const icons = getContactsIcons()

	return (
		<div className={"mx-auto flex w-full max-w-xl flex-col gap-4"}>
			{Object.entries(contacts)
				.filter(([, v]) => v.trim() !== "")
				.map(([key, value]) => (
					<div key={key} className={"flex items-center gap-3"}>
						{icons[key as keyof typeof contacts]}
						<p className={"text-lg font-medium"}>{value}</p>
					</div>
				))}
		</div>
	)
}
