import { Doc } from "@convex/_generated/dataModel"
import { ProgressiveImage } from "@/shared/ui/progressive-image.tsx"
import { Skeleton } from "@/shared/ui/skeleton.tsx"
import { cn } from "@/shared/ui/util.ts"
import { useGetAuthorPhoto } from "../model/queries.ts"

type Props = {
	author: Doc<"authors">
	containerClassName?: string
	imageClassName?: string
}

export const Photo = ({ author, containerClassName, imageClassName }: Props) => {
	const photo = useGetAuthorPhoto({ imageId: author.photo })

	return (
		<div className={cn("max-w-sm overflow-hidden rounded-xl shadow-lg", containerClassName)}>
			{photo ? (
				<ProgressiveImage
					alt={`${author._id}-photo`}
					placeholder={photo.url + "?tr=w-100,h-100,fo-auto,q-1"}
					src={photo.url + "?tr=h-800,w-800,fo-auto"}
					className={cn("aspect-square h-full w-96 object-cover", imageClassName)}
				/>
			) : (
				<Skeleton className={cn("aspect-square h-full w-96 max-w-full", imageClassName)} />
			)}
		</div>
	)
}
