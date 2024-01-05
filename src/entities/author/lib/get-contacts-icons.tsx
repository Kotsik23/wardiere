import { InstagramIcon, MailIcon, SendIcon } from "lucide-react"
import { ReactNode } from "react"
import { Doc } from "@convex/_generated/dataModel"

export const getContactsIcons = () => {
	const icons: Record<keyof Doc<"authors">["contacts"], ReactNode> = {
		email: <MailIcon className={"size-7 shrink-0 text-violet-500 dark:text-violet-400"} />,
		instagram: <InstagramIcon className={"size-7 shrink-0 text-pink-500 dark:text-pink-400"} />,
		telegram: <SendIcon className={"size-7 shrink-0 text-blue-500 dark:text-blue-400"} />,
	}

	return icons
}
