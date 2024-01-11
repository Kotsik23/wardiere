import { StringParam, useQueryParam, withDefault } from "use-query-params"
import { Label } from "@/shared/ui/label.tsx"
import { RadioGroup, RadioGroupItem } from "@/shared/ui/radio-group.tsx"
import { Skeleton } from "@/shared/ui/skeleton.tsx"
import { cn } from "@/shared/ui/util.ts"
import type { FilterProps } from "../model/types.ts"
import { FilterHeader } from "./filter-header.tsx"

export const SingleFilter = ({
	name,
	title,
	items,
	className,
}: FilterProps & { className?: string }) => {
	const defaultValue = items[0].value
	const [selected, setSelected] = useQueryParam(name, withDefault(StringParam, defaultValue))
	const handleReset = () => setSelected(defaultValue)
	const hasSelection = selected !== defaultValue

	return (
		<div className={cn("flex flex-col gap-3", className)}>
			<FilterHeader title={title} hasSelection={hasSelection} onReset={handleReset} />
			<RadioGroup value={selected} onValueChange={setSelected}>
				{items.map(item => (
					<div key={item.value} className={"flex items-center gap-2"}>
						<RadioGroupItem id={item.value} value={item.value} />
						<Label
							htmlFor={item.value}
							className={"text-additional-text text-base font-normal"}
						>
							{item.label}
						</Label>
					</div>
				))}
			</RadioGroup>
		</div>
	)
}

SingleFilter.Skeleton = () => {
	return (
		<div className={"flex flex-col gap-3"}>
			{Array.from({ length: 3 }).map((_, index) => (
				<div key={`single-filter-skeleton-${index}`} className={"flex items-center gap-3"}>
					<Skeleton className={"h-6 w-6 shrink-0 rounded-full"} />
					<Skeleton className={"h-6 w-full"} />
				</div>
			))}
		</div>
	)
}
