import { ChevronsUpDownIcon } from "lucide-react"
import { StringParam, useQueryParam, withDefault } from "use-query-params"
import { useBoolean, useMediaQuery } from "usehooks-ts"
import { useCategories } from "@/entities/category"
import { Button } from "@/shared/ui/button.tsx"
import { Drawer, DrawerContent, DrawerTrigger } from "@/shared/ui/drawer.tsx"
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover.tsx"
import { Skeleton } from "@/shared/ui/skeleton.tsx"
import { CategoriesList } from "./categories-list.tsx"

export const CategoriesSelect = () => {
	const { categories } = useCategories()
	const [categoryId, setCategoryId] = useQueryParam(
		"category",
		withDefault(StringParam, categories ? categories[0]?.value : "")
	)
	const { value: open, setValue: setOpen, setFalse: onClose } = useBoolean()
	const isDesktop = useMediaQuery("(min-width: 768px)")

	const currentCategory = categories?.find(c => c.value === categoryId)

	if (!categories) {
		return <Skeleton className={"h-10 w-32"} />
	}

	if (isDesktop) {
		return (
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button variant={"outline"} className={"w-full max-w-80 justify-between"}>
						{currentCategory?.label || "Select category"}{" "}
						<ChevronsUpDownIcon className={"ml-2 size-4 shrink-0 opacity-50"} />
					</Button>
				</PopoverTrigger>
				<PopoverContent className={"w-[--radix-popover-trigger-width] p-0"}>
					<CategoriesList
						onClose={onClose}
						setCategory={setCategoryId}
						categories={categories}
					/>
				</PopoverContent>
			</Popover>
		)
	}

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>
				<Button variant={"outline"} className={"w-full justify-between md:max-w-80"}>
					{currentCategory?.label || "Select category"}{" "}
					<ChevronsUpDownIcon className={"ml-2 size-4 shrink-0 opacity-50"} />
				</Button>
			</DrawerTrigger>
			<DrawerContent>
				<div className={"mt-4"}>
					<CategoriesList
						onClose={onClose}
						setCategory={setCategoryId}
						categories={categories}
					/>
				</div>
			</DrawerContent>
		</Drawer>
	)
}
