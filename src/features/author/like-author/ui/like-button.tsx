import { useUser } from "@clerk/clerk-react"
import { HeartIcon } from "lucide-react"
import { Doc } from "@convex/_generated/dataModel"
import { Button } from "@/shared/ui/button.tsx"
import { cn } from "@/shared/ui/util.ts"
import { useIsLiked } from "../model/use-is-liked.ts"
import { useToggleLike } from "../model/use-toggle-like.ts"

type LikeButtonProps = {
	author: Doc<"authors">
	className?: string
}

export const LikeButton = ({ author, className }: LikeButtonProps) => {
	const { user } = useUser()
	const isLiked = useIsLiked(author.likes)
	const { handleToggle, isPending } = useToggleLike()

	return (
		<Button
			variant={"outline"}
			onClick={() => handleToggle({ authorId: author._id, userId: user?.id })}
			disabled={isPending}
			className={cn("flex h-fit items-center gap-2 py-1", className)}
		>
			<HeartIcon
				className={cn(
					"h-5 w-5 shrink-0 text-destructive transition-all",
					isLiked && "fill-destructive"
				)}
			/>
			<span className={"pb-1 text-base leading-none"}>{author.likes.length}</span>
		</Button>
	)
}
