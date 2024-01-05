import { CategoriesSelect } from "@/features/categories-select"
import { SortPortfoliosButton } from "@/features/sort-portfolios"

export const PortfoliosHeader = () => {
	return (
		<div className={"flex w-full flex-col items-center justify-between gap-3 md:flex-row"}>
			<CategoriesSelect />
			<SortPortfoliosButton />
		</div>
	)
}
