import { useUser } from "@clerk/clerk-react"
import { Doc } from "@convex/_generated/dataModel"
import { ProgressiveImage } from "@/shared/ui/progressive-image.tsx"
import { Skeleton } from "@/shared/ui/skeleton.tsx"
import { cn } from "@/shared/ui/util.ts"

type Props = {
	author: Doc<"authors">
	containerClassName?: string
	imageClassName?: string
}

export const Photo = ({ author, containerClassName, imageClassName }: Props) => {
	const { user } = useUser()

	const photoUrl = author.photo?.url || user?.imageUrl

	return (
		<div className={cn("max-w-sm overflow-hidden rounded-xl shadow-lg", containerClassName)}>
			{photoUrl ? (
				<ProgressiveImage
					alt={`${author._id}-photo`}
					placeholder={photoUrl + "?tr=w-100,h-100,fo-auto,q-1"}
					src={photoUrl + "?tr=h-800,w-800,fo-auto"}
					className={cn("aspect-square h-full w-96 object-cover", imageClassName)}
				/>
			) : (
				<Skeleton className={cn("aspect-square h-full w-96 max-w-full", imageClassName)} />
			)}
		</div>
	)
}
