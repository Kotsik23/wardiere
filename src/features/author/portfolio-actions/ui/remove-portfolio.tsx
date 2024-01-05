import { TrashIcon } from "lucide-react"
import { Id } from "@convex/_generated/dataModel"
import { DropdownMenuItem } from "@/shared/ui/dropdown-menu.tsx"
import { cn } from "@/shared/ui/util.ts"
import { useRemovePortfolio } from "../model/use-remove-portfolio.ts"

type Props = {
	portfolioId: Id<"portfolios">
	className?: string
}

export const RemovePortfolio = ({ portfolioId, className }: Props) => {
	const { handleRemove } = useRemovePortfolio()

	return (
		<DropdownMenuItem className={cn(className)} onClick={() => handleRemove({ portfolioId })}>
			<TrashIcon className={"mr-2 h-5 w-5"} />
			Remove
		</DropdownMenuItem>
	)
}
