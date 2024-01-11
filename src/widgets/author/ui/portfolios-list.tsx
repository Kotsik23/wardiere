import { ChevronDownIcon } from "lucide-react"
import { StringParam, useQueryParams, withDefault } from "use-query-params"
import { Id } from "@convex/_generated/dataModel"
import { PortfolioImage, PortfoliosWrapper } from "@/entities/author"
import { useCategories } from "@/entities/category"
import { Button } from "@/shared/ui/button.tsx"
import { Skeleton } from "@/shared/ui/skeleton.tsx"
import { EmptyState } from "@/shared/ui/states/empty-state.tsx"
import { usePortfoliosList } from "../model/use-portfolios-list.ts"
import { PortfolioActions } from "./portfolio-actions.tsx"

type Props = {
	authorId: Id<"authors">
	editable?: boolean
}

export const PortfoliosList = ({ authorId, editable = false }: Props) => {
	const { categories } = useCategories({})
	const [params] = useQueryParams({
		category: withDefault(StringParam, categories ? categories[0]?.value : ""),
		sort: withDefault(StringParam, "desc"),
	})

	const { query } = usePortfoliosList({
		authorId,
		categoryId: params.category as Id<"categories">,
		order: params.sort as "asc" | "desc",
	})

	return (
		<>
			{query.status === "LoadingFirstPage" && <PortfoliosList.Skeleton />}
			{!query.isLoading && query.results.length <= 0 && (
				<EmptyState
					sectionClassName={"min-h-96"}
					text={"There is no portfolio images in this category yet"}
				/>
			)}
			{query.results.length > 0 && (
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
				</div>
			)}
			{query.status === "LoadingMore" && <PortfoliosList.Skeleton />}
			{query.status !== "Exhausted" && (
				<Button
					variant={"outline"}
					disabled={query.isLoading}
					onClick={() => query.loadMore(10)}
				>
					Load More <ChevronDownIcon className={"ml-2 size-5"} />
				</Button>
			)}
		</>
	)
}

PortfoliosList.Skeleton = () => {
	return (
		<PortfoliosWrapper>
			{Array.from({ length: 10 }).map((_, index) => (
				<Skeleton key={index} className={"aspect-square h-full w-full rounded-xl shadow-lg"} />
			))}
		</PortfoliosWrapper>
	)
}
