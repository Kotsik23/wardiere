import { CircleIcon } from "lucide-react"
import { Id } from "@convex/_generated/dataModel"
import { CategorySelectItem } from "@/entities/category"
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/shared/ui/command.tsx"
import { cn } from "@/shared/ui/util.ts"

type Props = {
	onClose: () => void
	setCategory: (categoryId: Id<"categories">) => void
	categories: CategorySelectItem[]
}

export const CategoriesList = ({ onClose, setCategory, categories }: Props) => {
	const handleSelect = (value: string) => {
		setCategory(value as Id<"categories">)
		onClose()
	}
	const handleFilter = (value: string, search: string) => {
		const category = categories.find(c => c.value === value)
		if (category?.label.toLowerCase().includes(search.toLowerCase())) return 1
		return 0
	}

	return (
		<Command filter={handleFilter}>
			<CommandInput placeholder={"Category..."} />
			<CommandList>
				<CommandEmpty>No such category.</CommandEmpty>
				<CommandGroup>
					{categories.map(category => (
						<CommandItem
							key={category.value}
							value={category.value}
							onSelect={handleSelect}
							className={"justify-between text-base"}
						>
							{category.label}
							<CircleIcon
								strokeWidth={3}
								className={cn("size-2.5 text-secondary", category.has && "fill-secondary")}
							/>
						</CommandItem>
					))}
				</CommandGroup>
			</CommandList>
		</Command>
	)
}
