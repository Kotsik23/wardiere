import { genderItems, MultipleFilter, SingleFilter } from "@/features/filters"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card.tsx"
import { Spinner } from "@/shared/ui/spinner.tsx"
import { cn } from "@/shared/ui/util.ts"
import { useCategories } from "../model/queries.ts"

type FiltersProps = {
	containerClassName?: string
	titleClassName?: string
	contentClassName?: string
}

export const Filters = ({ containerClassName, titleClassName, contentClassName }: FiltersProps) => {
	const { categories } = useCategories()

	const isLoading = !categories

	return (
		<Card className={cn("w-80 shrink-0", containerClassName)}>
			<CardHeader className={"p-4"}>
				<CardTitle className={titleClassName}>Filter By</CardTitle>
			</CardHeader>
			<CardContent className={cn("flex flex-col gap-4 p-4", contentClassName)}>
				{isLoading ? (
					<div className={"grid place-items-center"}>
						<Spinner />
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
