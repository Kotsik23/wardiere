import { useMediaQuery } from "usehooks-ts"
import { AuthorsList } from "@/widgets/author"
import { FiltersCard, FiltersDrawer } from "@/widgets/filters"
import { useGetAuthors } from "@/entities/author"
import { PageLayout } from "@/shared/ui/layouts"
import { Spinner } from "@/shared/ui/spinner.tsx"

export const ExplorePage = () => {
	const isMedium = useMediaQuery("(min-width: 768px)")
	const { query } = useGetAuthors({ initialNumItems: 5 })

	return (
		<>
			<PageLayout className={"container my-8 flex flex-col gap-6 md:flex-row"}>
				{isMedium ? <FiltersCard /> : <FiltersDrawer />}
				{query.isLoading ? (
					<div className={"flex h-[40vh] w-full items-center justify-center"}>
						<Spinner />
					</div>
				) : (
					<AuthorsList authors={query.results} />
				)}
			</PageLayout>
		</>
	)
}
