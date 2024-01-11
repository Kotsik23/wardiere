import { ArrayParam, useQueryParam, withDefault } from "use-query-params"
import { useDebounce, useMediaQuery } from "usehooks-ts"
import { Id } from "@convex/_generated/dataModel"
import { AuthorsList } from "@/widgets/author"
import { FiltersCard, FiltersDrawer } from "@/widgets/filters"
import { ResetFiltersButton } from "@/features/filters"
import { useGetAuthors } from "@/entities/author"
import { PageLayout } from "@/shared/ui/layouts"
import { EmptyState } from "@/shared/ui/states/empty-state.tsx"

export const ExplorePage = () => {
	const [categories] = useQueryParam("category", withDefault(ArrayParam, []))
	const debouncedCategories = useDebounce(categories, 300)
	const { query } = useGetAuthors({
		categories: debouncedCategories as Id<"categories">[] | undefined,
		initialNumItems: 5,
	})

	const isMedium = useMediaQuery("(min-width: 768px)")

	return (
		<>
			<PageLayout className={"container my-9 flex min-h-screen flex-col gap-6 md:flex-row"}>
				{isMedium ? <FiltersCard /> : <FiltersDrawer />}
				{query.status === "LoadingFirstPage" && <AuthorsList.Skeleton />}
				{!query.isLoading && query.results.length <= 0 && (
					<EmptyState
						sectionClassName={"max-h-96 mt-12"}
						iconClassName={"size-32"}
						action={<ResetFiltersButton />}
					/>
				)}
				{query.results.length > 0 && <AuthorsList authors={query.results} />}
			</PageLayout>
		</>
	)
}
