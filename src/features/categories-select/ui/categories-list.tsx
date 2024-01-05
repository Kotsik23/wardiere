import { Id } from "@convex/_generated/dataModel"
import { SelectItem } from "@/entities/category"
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/shared/ui/command.tsx"

type Props = {
	onClose: () => void
	setCategory: (categoryId: Id<"categories">) => void
	categories: SelectItem[]
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
						<CommandItem key={category.value} value={category.value} onSelect={handleSelect}>
							{category.label}
						</CommandItem>
					))}
				</CommandGroup>
			</CommandList>
		</Command>
	)
}
