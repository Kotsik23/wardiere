import { FilterIcon } from "lucide-react"
import { Button } from "@/shared/ui/button.tsx"
import { useResetFilter } from "../model/use-reset-filter.ts"

type Props = {
	className?: string
}

export const ResetFiltersButton = ({ className }: Props) => {
	const { handleReset, disabled } = useResetFilter()

	return (
		<Button onClick={handleReset} size={"sm"} className={className} disabled={disabled}>
			Reset Filters <FilterIcon className={"ml-2 size-5"} />
		</Button>
	)
}
