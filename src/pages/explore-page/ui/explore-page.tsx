import { useInView } from "react-intersection-observer"
import { ArrayParam, useQueryParam, withDefault } from "use-query-params"
import { useDebounce, useMediaQuery } from "usehooks-ts"
import { Id } from "@convex/_generated/dataModel"
import { AuthorsList } from "@/widgets/author"
import { FiltersCard, FiltersDrawer } from "@/widgets/filters"
import { ResetFiltersButton } from "@/features/filters"
import { useGetAuthors } from "@/entities/author"
import { ROUTES } from "@/shared/constants/routes.ts"
import { Breadcrumbs } from "@/shared/ui/breadcrumbs.tsx"
import { PageLayout } from "@/shared/ui/layouts"
import { EmptyState } from "@/shared/ui/states/empty-state.tsx"
import { CarouselBanner } from "@/widgets/carousel-banner"

export const ExplorePage = () => {
	const [categories] = useQueryParam("category", withDefault(ArrayParam, []))
	const debouncedCategories = useDebounce(categories, 300)
	const { query } = useGetAuthors({
		categories: debouncedCategories as Id<"categories">[] | undefined,
		initialNumItems: 4,
	})

	const handleInfiniteChange = (inView: boolean) => {
		if (inView && query.status !== "Exhausted") {
			query.loadMore(4)
		}
	}

	const { ref: infiniteRef } = useInView({ onChange: handleInfiniteChange })

	const isMedium = useMediaQuery("(min-width: 768px)")

	return (
		<>
			<Breadcrumbs
				className={"container my-6"}
				pages={[{ name: "Explore", href: ROUTES.EXPLORE, currentPage: true }]}
			/>
			<CarouselBanner className={"container mb-12"} />
			<PageLayout className={"container my-6 flex min-h-screen flex-col gap-6 md:flex-row"}>
				{isMedium ? <FiltersCard /> : <FiltersDrawer />}
				{query.status === "LoadingFirstPage" && <AuthorsList.Skeleton />}
				{!query.isLoading && query.results.length <= 0 && (
					<EmptyState
						sectionClassName={"max-h-96 mt-12"}
						iconClassName={"size-32"}
						action={<ResetFiltersButton />}
					/>
				)}
				{query.results.length > 0 && (
					<div className={"flex w-full flex-col gap-6"}>
						<AuthorsList authors={query.results} />
						{query.status === "LoadingMore" && <AuthorsList.Skeleton />}
						<div ref={infiniteRef} />
					</div>
				)}
			</PageLayout>
		</>
	)
}
