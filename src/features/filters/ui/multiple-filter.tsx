import { CheckedState } from "@radix-ui/react-checkbox"
import { ArrayParam, useQueryParam, withDefault } from "use-query-params"
import { Checkbox } from "@/shared/ui/checkbox.tsx"
import { Label } from "@/shared/ui/label.tsx"
import { cn } from "@/shared/ui/util.ts"
import type { FilterItemType, FilterProps } from "../model/types.ts"
import { FilterHeader } from "./filter-header.tsx"

export const MultipleFilter = ({
	name,
	title,
	items,
	className,
}: FilterProps & { className?: string }) => {
	const defaultValue: string[] = []
	const [selected, setSelected] = useQueryParam(name, withDefault(ArrayParam, defaultValue))
	const handleReset = () => setSelected(defaultValue)
	const hasSelection = selected?.length > 0

	const handleCheckedChange = (checked: CheckedState, filter: FilterItemType) => {
		setSelected(
			checked ? [...selected, filter.value] : selected?.filter(item => item !== filter.value)
		)
	}

	return (
		<div className={cn("flex flex-col gap-3", className)}>
			<FilterHeader title={title} hasSelection={hasSelection} onReset={handleReset} />
			{items.map(item => (
				<div key={item.value} className={"flex items-center gap-2"}>
					<Checkbox
						id={item.value}
						checked={(selected as string[])?.includes(item.value)}
						onCheckedChange={checked => handleCheckedChange(checked, item)}
					/>
					<Label htmlFor={item.value} className={"text-additional-text text-base font-normal"}>
						{item.label}
					</Label>
				</div>
			))}
		</div>
	)
}
