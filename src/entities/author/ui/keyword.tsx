import { ReactNode } from "react"
import { Badge } from "@/shared/ui/badge.tsx"
import { cn } from "@/shared/ui/util.ts"

type Props = {
	keyword: string
	actions?: ReactNode
	className?: string
}

export const Keyword = ({ keyword, actions, className }: Props) => {
	return (
		<Badge
			variant={"outline"}
			className={cn("w-fit capitalize transition-colors hover:text-secondary", className)}
		>
			#{keyword}
			{actions}
		</Badge>
	)
}

export const KeywordsWrapper = ({
	children,
	className,
}: {
	children: ReactNode
	className?: string
}) => {
	return (
		<div
			className={cn("flex flex-wrap items-center justify-center gap-3 md:max-w-4xl", className)}
		>
			{children}
		</div>
	)
}
