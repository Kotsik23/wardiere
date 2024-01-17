import { LucideIcon } from "lucide-react"
import { cn } from "./util.ts"

type Props = {
	icon?: LucideIcon
	title: string
	containerClassName?: string
	titleClassName?: string
	iconClassName?: string
}

export const SectionHeading = ({
	icon: Icon,
	title,
	containerClassName,
	titleClassName,
	iconClassName,
}: Props) => {
	return (
		<div className={cn("glowing-text flex items-center gap-2 md:gap-4", containerClassName)}>
			<h2 className={cn("text-xl font-semibold md:text-2xl lg:text-3xl", titleClassName)}>
				{title}
			</h2>
			{Icon && <Icon className={cn("size-6 text-secondary md:size-8", iconClassName)} />}
		</div>
	)
}
