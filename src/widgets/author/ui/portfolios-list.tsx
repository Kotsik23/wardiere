import { StringParam, useQueryParam, withDefault } from "use-query-params"
import { Id } from "@convex/_generated/dataModel"
import { PortfolioImage, PortfoliosWrapper } from "@/entities/author"
import { usePortfoliosList } from "../model/use-portfolios-list.ts"
import { PortfolioActions } from "./portfolio-actions.tsx"

type Props = {
	authorId: Id<"authors">
	editable?: boolean
}

export const PortfoliosList = ({ authorId, editable = false }: Props) => {
	const defaultCategory = "j9792qgqc6zm47cr4b0nfkrrkd6gw55w"
	const [categoryId] = useQueryParam("category", withDefault(StringParam, defaultCategory))

	const { query } = usePortfoliosList({ authorId, categoryId: categoryId as Id<"categories"> })

	return (
		<PortfoliosWrapper>
			{query.results.map(portfolio => (
				<PortfolioImage
					key={portfolio._id}
					portfolioId={portfolio._id}
					url={portfolio.url}
					containerClassName={"max-w-full relative group"}
					actions={
						<PortfolioActions
							portfolio={portfolio}
							editable={editable}
							triggerClassName={"absolute top-1 right-1"}
						/>
					}
				/>
			))}
		</PortfoliosWrapper>
	)
}
