import { PlusIcon } from "lucide-react"
import { ChangeEvent, FormEvent, useState } from "react"
import { toast } from "sonner"
import { Id } from "@convex/_generated/dataModel"
import { Button } from "@/shared/ui/button.tsx"
import { Input } from "@/shared/ui/input.tsx"
import { cn } from "@/shared/ui/util.ts"
import { useEditable } from "../model/use-editable.ts"

type Props = {
	authorId: Id<"authors">
	keywords: string[]
	className?: string
}

export const CreateKeyword = ({ authorId, keywords, className }: Props) => {
	const [keywordValue, setKeywordValue] = useState<string>("")
	const { handleUpdate } = useEditable()

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setKeywordValue(e.target.value)
	}

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (keywords.length >= 10) {
			setKeywordValue("")
			return toast.warning("The maximum number of keywords is 10")
		}
		handleUpdate({
			authorId,
			payload: {
				keywords: [...keywords, keywordValue],
			},
		})
		setKeywordValue("")
	}

	const isEmpty = keywordValue.trim() === ""

	return (
		<form
			className={cn("flex w-full max-w-lg items-center gap-4", className)}
			onSubmit={handleSubmit}
		>
			<Input placeholder={"Create keyword..."} value={keywordValue} onChange={handleChange} />
			<Button size={"icon"} className={"shrink-0"} disabled={isEmpty} type={"submit"}>
				<PlusIcon />
			</Button>
		</form>
	)
}
