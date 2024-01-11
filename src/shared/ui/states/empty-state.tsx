import { GalleryVerticalEndIcon } from "lucide-react"
import { ReactNode } from "react"
import { cn } from "../util.ts"

type Props = {
	sectionClassName?: string
	textClassName?: string
	iconClassName?: string
	action?: ReactNode
	text?: string
}

export const EmptyState = ({
	sectionClassName,
	textClassName,
	iconClassName,
	text,
	action,
}: Props) => {
	return (
		<section
			className={cn(
				"flex w-full flex-col items-center justify-center gap-4 text-muted-foreground",
				sectionClassName
			)}
		>
			<GalleryVerticalEndIcon className={cn("size-24", iconClassName)} strokeWidth={1} />
			<p className={cn("max-w-sm text-balance text-center text-lg font-medium", textClassName)}>
				{text || "There is nothing here..."}
			</p>
			{action}
		</section>
	)
}
