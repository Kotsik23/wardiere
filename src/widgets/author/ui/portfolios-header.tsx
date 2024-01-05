import { CategoriesSelect } from "@/features/categories-select"

export const PortfoliosHeader = () => {
	return (
		<div className={"flex w-full flex-col items-center justify-between gap-6 md:flex-row"}>
			<CategoriesSelect />
		</div>
	)
}
