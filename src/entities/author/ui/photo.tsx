import { Doc } from "@convex/_generated/dataModel"
import { ProgressiveImage } from "@/shared/ui/progressive-image.tsx"
import { Skeleton } from "@/shared/ui/skeleton.tsx"
import { useGetAuthorPhoto } from "../model/queries.ts"

type Props = {
	author: Doc<"author">
}

export const Photo = ({ author }: Props) => {
	const photo = useGetAuthorPhoto({ imageId: author.photo })

	return (
		<div className={"max-w-sm overflow-hidden rounded-xl shadow-lg"}>
			{photo ? (
				<ProgressiveImage
					alt={`${author._id}-photo`}
					placeholder={photo.url + "?tr=w-100,h-100,fo-auto,q-1"}
					src={photo.url + "?tr=h-800,w-800,fo-auto"}
					className={"aspect-square h-full w-96 object-cover"}
				/>
			) : (
				<Skeleton className={"aspect-square h-full w-96"} />
			)}
		</div>
	)
}
