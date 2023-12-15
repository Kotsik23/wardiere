import { MessageSquareIcon } from "lucide-react"
import { Button } from "@/shared/ui/button.tsx"

export const CommentButton = () => {
	return (
		<Button variant={"outline"} className={"flex h-fit items-center gap-2 py-1"}>
			<MessageSquareIcon className={"h-5 w-5 shrink-0"} />
			<span className={"pb-1 text-base leading-none"}>319</span>
		</Button>
	)
}
