import { Doc } from "@convex/_generated/dataModel"
import { RemovePortfolioButton } from "@/features/author/remove-portfolio-image"
import { PortfolioImage } from "@/entities/author/ui/portfolio-image.tsx"

type Props = {
	author: Doc<"authors">
}

export const PortfolioImagesGrid = ({ author }: Props) => {
	return (
		<div className={"grid grid-cols-5 gap-8"}>
			{author.portfolioImages.map(imgId => (
				<PortfolioImage
					key={imgId}
					imageId={imgId}
					action={
						<RemovePortfolioButton
							authorId={author._id}
							portfolioImageId={imgId}
							className={"absolute -right-3 -top-3"}
						/>
					}
				/>
			))}
		</div>
	)
}
