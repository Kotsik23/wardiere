import { useMediaQuery } from "usehooks-ts"
import { AuthorsList } from "@/widgets/author"
import { Filters } from "@/widgets/filters"
import { useGetAuthors } from "@/entities/author"
import { PageLayout } from "@/shared/ui/layouts"
import { Spinner } from "@/shared/ui/spinner.tsx"

export const ExplorePage = () => {
	const isDesktop = useMediaQuery("(min-width: 1024px)")
	const { query } = useGetAuthors({ initialNumItems: 5 })

	return (
		<>
			<PageLayout className={"container my-28 flex gap-6"}>
				{isDesktop && <Filters />}
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
