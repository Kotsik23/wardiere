import { LucideIcon } from "lucide-react"
import { Card } from "./card.tsx"
import { cn } from "./util.ts"

export const StatItem = ({
	icon: Icon,
	value,
	className,
}: {
	icon: LucideIcon
	className?: string
	value: number
}) => {
	return (
		<Card className={"flex min-w-14 items-center justify-center gap-1.5 px-1"}>
			<Icon className={cn("size-5", className)} />
			<span className={"text-lg font-semibold"}>{value}</span>
		</Card>
	)
}
