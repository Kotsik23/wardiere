import { ReactNode } from "react"
import { Id } from "@convex/_generated/dataModel"
import { ProgressiveImage } from "@/shared/ui/progressive-image.tsx"
import { cn } from "@/shared/ui/util.ts"

type Props = {
	portfolioId: Id<"portfolios">
	url: string
	actions?: ReactNode
	containerClassName?: string
	imageClassName?: string
}

export const PortfolioImage = ({
	portfolioId,
	url,
	actions,
	containerClassName,
	imageClassName,
}: Props) => {
	return (
		<div className={cn("max-w-sm overflow-hidden rounded-xl shadow-lg", containerClassName)}>
			<ProgressiveImage
				loading={"lazy"}
				alt={portfolioId}
				placeholder={url + "?tr=fo-auto,w-0.05,h-0.05,q-1"}
				src={url + "?tr=q-80,fo-auto"}
				className={cn("aspect-square h-full w-full object-cover", imageClassName)}
			/>
			{actions}
		</div>
	)
}

export const PortfoliosWrapper = ({
	children,
	className,
}: {
	children: ReactNode
	className?: string
}) => {
	return <div className={cn("grid w-full grid-cols-portfolios gap-4", className)}>{children}</div>
}
