import { FilterIcon } from "lucide-react"
import { genderItems, MultipleFilter, ResetFiltersButton, SingleFilter } from "@/features/filters"
import { useCategories } from "@/entities/category"
import { Button } from "@/shared/ui/button.tsx"
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/shared/ui/drawer.tsx"
import { Spinner } from "@/shared/ui/spinner.tsx"

export const FiltersDrawer = () => {
	const { categories } = useCategories()

	return (
		<Drawer>
			<DrawerTrigger asChild>
				<Button>
					<FilterIcon className={"mr-2 h-5 w-5"} />
					Filters
				</Button>
			</DrawerTrigger>
			<DrawerContent className={"max-h-[94%] outline-none"}>
				<DrawerHeader>
					<div className={"flex items-center justify-between gap-4"}>
						<DrawerTitle className={"text-2xl"}>Filter By</DrawerTitle>
						<ResetFiltersButton />
					</div>
				</DrawerHeader>
				<div className={"flex flex-col gap-8 overflow-auto p-4"}>
					{!categories ? (
						<div className={"grid place-items-center"}>
							<Spinner />
						</div>
					) : (
						<>
							<MultipleFilter name={"category"} title={"Categories"} items={categories} />
							<SingleFilter name={"gender"} title={"Gender"} items={genderItems} />
						</>
					)}
				</div>
				<DrawerFooter>
					<DrawerClose asChild>
						<Button>Apply Filters</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	)
}
