import { genderItems, MultipleFilter, ResetFiltersButton, SingleFilter } from "@/features/filters"
import { useCategories } from "@/entities/category"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card.tsx"
import { cn } from "@/shared/ui/util.ts"

type FiltersProps = {
	containerClassName?: string
	titleClassName?: string
	contentClassName?: string
}

export const FiltersCard = ({
	containerClassName,
	titleClassName,
	contentClassName,
}: FiltersProps) => {
	const { categories } = useCategories()

	return (
		<Card className={cn("sticky top-24 h-fit w-80 shrink-0", containerClassName)}>
			<CardHeader className={"p-4"}>
				<div className={"flex items-center justify-between gap-4"}>
					<CardTitle className={titleClassName}>Filter By</CardTitle>
					<ResetFiltersButton />
				</div>
			</CardHeader>
			<CardContent className={cn("flex flex-col gap-4 p-4", contentClassName)}>
				{!categories ? (
					<div className={"flex flex-col gap-8"}>
						<MultipleFilter.Skeleton />
						<SingleFilter.Skeleton />
					</div>
				) : (
					<>
						<MultipleFilter name={"category"} title={"Categories"} items={categories} />
						<SingleFilter name={"gender"} title={"Gender"} items={genderItems} />
					</>
				)}
			</CardContent>
		</Card>
	)
}
