import { Id } from "@convex/_generated/dataModel"
import { CategoriesSelect } from "@/features/categories-select"
import { SortPortfoliosButton } from "@/features/sort-portfolios"

type Props = {
	authorId: Id<"authors">
	onlyExists?: boolean
}

export const PortfoliosHeader = ({ authorId, onlyExists = false }: Props) => {
	return (
		<div className={"flex w-full flex-col items-center justify-between gap-3 md:flex-row"}>
			<CategoriesSelect authorId={authorId} onlyExists={onlyExists} />
			<SortPortfoliosButton />
		</div>
	)
}
