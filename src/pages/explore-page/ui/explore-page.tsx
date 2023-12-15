import { usePaginatedQuery } from "convex/react"
import { useMediaQuery } from "usehooks-ts"
import { api } from "@convex/_generated/api"
import { AuthorsList } from "@/widgets/author"
import { Filters } from "@/widgets/filters"
import { Spinner } from "@/shared/ui/spinner.tsx"

export const ExplorePage = () => {
	const isDesktop = useMediaQuery("(min-width: 1024px)")
	const { isLoading, results: authors } = usePaginatedQuery(
		api.authors.getAll,
		{},
		{ initialNumItems: 5 }
	)

	return (
		<>
			<main className={"container my-28 flex gap-6"}>
				{isDesktop && <Filters />}
				{isLoading ? (
					<div className={"flex h-[40vh] w-full items-center justify-center"}>
						<Spinner />
					</div>
				) : (
					<AuthorsList authors={authors} />
				)}
			</main>
		</>
	)
}
