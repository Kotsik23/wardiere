import { ChevronDownIcon, GalleryVerticalEndIcon } from "lucide-react"
import { StringParam, useQueryParam, withDefault } from "use-query-params"
import { Id } from "@convex/_generated/dataModel"
import { PortfolioImage, PortfoliosWrapper } from "@/entities/author"
import { Button } from "@/shared/ui/button.tsx"
import { usePortfoliosList } from "../model/use-portfolios-list.ts"
import { PortfolioActions } from "./portfolio-actions.tsx"
import { Spinner } from "@/shared/ui/spinner.tsx"

type Props = {
	authorId: Id<"authors">
	editable?: boolean
}

export const PortfoliosList = ({ authorId, editable = false }: Props) => {
	const defaultCategory = "j9792qgqc6zm47cr4b0nfkrrkd6gw55w"
	const [categoryId] = useQueryParam("category", withDefault(StringParam, defaultCategory))

	const { query } = usePortfoliosList({ authorId, categoryId: categoryId as Id<"categories"> })

	if (query.isLoading) {
		return (
			<div className={"flex h-96 flex-col items-center justify-center"}>
				<Spinner className={"size-10"} />
			</div>
		)
	}

	if (!query.isLoading && query.results.length <= 0) {
		return (
			<div
				className={"flex h-96 flex-col items-center justify-center gap-6 text-muted-foreground"}
			>
				<GalleryVerticalEndIcon className={"size-24"} strokeWidth={1} />
				<p className={"max-w-sm text-balance text-center text-lg font-medium"}>
					There is no portfolio images in this category yet
				</p>
			</div>
		)
	}

	return (
		<div className={"flex min-h-96 w-full flex-col items-center gap-6"}>
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
			<Button
				variant={"outline"}
				onClick={() => query.loadMore(10)}
				disabled={query.status === "Exhausted" || query.isLoading}
			>
				Load More <ChevronDownIcon className={"ml-2 size-5"} />
			</Button>
		</div>
	)
}
