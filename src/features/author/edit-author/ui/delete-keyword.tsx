import { XIcon } from "lucide-react"
import { Id } from "@convex/_generated/dataModel"
import { Button } from "@/shared/ui/button.tsx"
import { cn } from "@/shared/ui/util.ts"
import { useEditable } from "../model/use-editable.ts"

type Props = {
	authorId: Id<"authors">
	keywords: string[]
	currentKeyword: string
	className?: string
}

export const DeleteKeyword = ({ authorId, keywords, currentKeyword, className }: Props) => {
	const { handleUpdate } = useEditable()

	const handleDelete = () => {
		handleUpdate({
			authorId,
			payload: {
				keywords: keywords.filter(keyword => keyword !== currentKeyword),
			},
		})
	}

	return (
		<Button
			size={"icon"}
			className={cn("h-5 w-5 rounded-full", className)}
			onClick={handleDelete}
		>
			<XIcon className={"h-4 w-4"} />
		</Button>
	)
}
