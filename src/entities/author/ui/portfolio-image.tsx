import { ReactNode } from "react"
import { Id } from "@convex/_generated/dataModel"
import { ProgressiveImage } from "@/shared/ui/progressive-image.tsx"
import { Skeleton } from "@/shared/ui/skeleton.tsx"
import { cn } from "@/shared/ui/util.ts"
import { useGetPortfolioImage } from "../model/queries.ts"

type Props = {
	imageId: Id<"portfolioImages">
	action?: ReactNode
}

export const PortfolioImage = ({ imageId, action }: Props) => {
	const image = useGetPortfolioImage({ imageId })

	return (
		<div className={"group relative"}>
			<div className={cn("max-w-sm overflow-hidden rounded-xl shadow-lg")}>
				{image ? (
					<ProgressiveImage
						alt={`${image._id}-photo`}
						placeholder={image.url + "?tr=w-100,h-100,fo-auto,q-1"}
						src={image.url + "?tr=h-800,w-800,fo-auto"}
						className={cn("aspect-square h-full w-80 object-cover")}
					/>
				) : (
					<Skeleton className={cn("aspect-square h-full w-80 max-w-full")} />
				)}
			</div>
			<div className={"opacity-0 transition-all group-hover:opacity-100"}>{action}</div>
		</div>
	)
}
