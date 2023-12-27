import { useUser } from "@clerk/clerk-react"
import { SendHorizonalIcon } from "lucide-react"
import { FormEvent, useState } from "react"
import { Id } from "@convex/_generated/dataModel"
import { Button } from "@/shared/ui/button.tsx"
import { Textarea } from "@/shared/ui/textarea.tsx"
import { unauthenticatedToast } from "@/shared/ui/toasts"
import { cn } from "@/shared/ui/util.ts"
import { useCreateComment } from "../model/use-create-comment.ts"

type Props = {
	authorId: Id<"authors">
	afterSubmit?: () => void
	className?: string
}

export const CreateCommentForm = ({ authorId, afterSubmit, className }: Props) => {
	const [text, setText] = useState<string>("")
	const { user } = useUser()
	const { handleCreate, isPending } = useCreateComment()

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (!user?.id) {
			return unauthenticatedToast()
		}
		await handleCreate({
			authorId,
			text,
			userId: user.id,
		})
		setText("")
		afterSubmit?.()
	}

	return (
		<fieldset
			disabled={isPending}
			className={"w-full disabled:pointer-events-none disabled:opacity-50"}
		>
			<form className={cn("flex items-center gap-4", className)} onSubmit={handleSubmit}>
				<Textarea
					placeholder={"Write your opinion..."}
					minRows={1}
					maxRows={4}
					className={"resize-none"}
					value={text}
					onChange={e => setText(e.target.value)}
				/>
				<Button
					type={"submit"}
					size={"icon"}
					className={"shrink-0"}
					disabled={text.trim().length <= 0}
				>
					<SendHorizonalIcon className={"h-5 w-5"} />
				</Button>
			</form>
		</fieldset>
	)
}
