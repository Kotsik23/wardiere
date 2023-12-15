import { Badge } from "@/shared/ui/badge.tsx"
import { cn } from "@/shared/ui/util.ts"

type NewBadgeProps = {
	className?: string
}

export const NewBadge = ({ className }: NewBadgeProps) => {
	return (
		<Badge
			className={cn(
				"bg-green-500 font-semibold uppercase hover:bg-green-500/90 dark:bg-green-400 dark:hover:bg-green-400/90",
				className
			)}
		>
			NEW
		</Badge>
	)
}
