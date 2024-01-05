import { useUser } from "@clerk/clerk-react"
import { HeartIcon } from "lucide-react"
import { Id } from "@convex/_generated/dataModel"
import { formatBigNumber } from "@/shared/lib/format-big-number.ts"
import { Button } from "@/shared/ui/button.tsx"
import { Skeleton } from "@/shared/ui/skeleton.tsx"
import { unauthenticatedToast } from "@/shared/ui/toasts"
import { cn } from "@/shared/ui/util.ts"
import { useGetLikes } from "../model/use-get-likes.ts"
import { useToggleLike } from "../model/use-toggle-like.ts"

type Props = {
	authorId: Id<"authors">
}

export const LikeButton = ({ authorId }: Props) => {
	const { likes } = useGetLikes({ authorId })
	const { handleToggle, isPending } = useToggleLike()
	const { user } = useUser()

	const handleClick = () => {
		if (!user) {
			return unauthenticatedToast()
		}
		handleToggle({ authorId, clerkUserId: user.id })
	}

	if (!likes) {
		return <Skeleton className={"h-11 w-24"} />
	}

	return (
		<Button
			variant={"outline"}
			className={"px-5"}
			size={"lg"}
			onClick={handleClick}
			disabled={isPending}
		>
			<HeartIcon
				className={cn(
					"mr-5 size-7 transition-all",
					likes.some(l => l.clerkUserId === user?.id) && "fill-destructive text-destructive"
				)}
			/>
			<span className={"text-2xl font-medium"}>{formatBigNumber(likes.length)}</span>
		</Button>
	)
}
