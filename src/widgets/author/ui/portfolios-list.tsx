import { ChevronDownIcon, GalleryVerticalEndIcon } from "lucide-react"
import { StringParam, useQueryParams, withDefault } from "use-query-params"
import { Id } from "@convex/_generated/dataModel"
import { PortfolioImage, PortfoliosWrapper } from "@/entities/author"
import { useCategories } from "@/entities/category"
import { Button } from "@/shared/ui/button.tsx"
import { Skeleton } from "@/shared/ui/skeleton.tsx"
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

	if (!query.results || query.isLoading) {
		return <PortfoliosList.Skeleton />
	}

	if (!query.isLoading && query.results.length <= 0) {
		return (
			<div
				className={
					"flex min-h-96 flex-col items-center justify-center gap-6 text-muted-foreground"
				}
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
			{query.results.length > 0 && query.status === "CanLoadMore" && (
				<Button
					variant={"outline"}
					disabled={query.isLoading}
					onClick={() => query.loadMore(10)}
				>
					Load More <ChevronDownIcon className={"ml-2 size-5"} />
				</Button>
			)}
		</div>
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
