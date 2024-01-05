import { ArrowDownNarrowWideIcon, ArrowUpNarrowWideIcon } from "lucide-react"
import { StringParam, useQueryParam, withDefault } from "use-query-params"
import { Button } from "@/shared/ui/button.tsx"

export const SortPortfoliosButton = () => {
	const [sort, setSort] = useQueryParam("sort", withDefault(StringParam, "desc"))

	const handleClick = () => {
		setSort(prev => (prev === "asc" ? "desc" : "asc"))
	}

	return (
		<Button
			variant={"outline"}
			onClick={handleClick}
			className={"w-full justify-between md:max-w-28"}
		>
			{sort === "asc" ? "Oldest" : "Newest"}
			{sort === "asc" ? (
				<ArrowUpNarrowWideIcon className={"ml-2 size-5"} />
			) : (
				<ArrowDownNarrowWideIcon className={"ml-2 size-5"} />
			)}
		</Button>
	)
}
