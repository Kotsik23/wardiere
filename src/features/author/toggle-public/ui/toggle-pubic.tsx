import { useBoolean } from "usehooks-ts"
import { Doc } from "@convex/_generated/dataModel"
import { ConfirmationDialog } from "@/shared/ui/confirmation"
import { Label } from "@/shared/ui/label.tsx"
import { Switch } from "@/shared/ui/switch.tsx"
import { cn } from "@/shared/ui/util.ts"
import { useTogglePublic } from "../model/use-toggle-public.ts"

type TogglePubicProps = {
	author: Doc<"author">
	className?: string
}

export const TogglePubic = ({ author, className }: TogglePubicProps) => {
	const { value: open, setValue: setOpen, toggle } = useBoolean()
	const { handleTogglePublic, isPending } = useTogglePublic()

	return (
		<>
			<div className={cn("flex items-center gap-2", className)}>
				<Switch id={"public-author"} checked={author.isPublic} onCheckedChange={toggle} />
				<Label htmlFor={"public-author"} className={"text-base"}>
					Toggle Public
				</Label>
			</div>
			<ConfirmationDialog
				open={open}
				onOpenChange={setOpen}
				onConfirm={() => handleTogglePublic({ authorId: author._id })}
				title={"Confirmation"}
				description={
					author.isPublic
						? "No one will be able to see your author page. It will become private and will be available only to you. Do you want to continue?"
						: "Now your author's page will be available to everyone. Every user will see publicly available information. Do you want to continue?"
				}
				isPending={isPending}
			/>
		</>
	)
}
