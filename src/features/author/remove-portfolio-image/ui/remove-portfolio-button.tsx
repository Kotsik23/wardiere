import { TrashIcon } from "lucide-react"
import { Id } from "@convex/_generated/dataModel"
import { Button } from "@/shared/ui/button.tsx"
import { cn } from "@/shared/ui/util.ts"
import { useRemovePortfolio } from "../model/use-remove-portfolio.ts"
import { Spinner } from "@/shared/ui/spinner.tsx"

type Props = {
	authorId: Id<"authors">
	portfolioImageId: Id<"portfolioImages">
	className?: string
}

export const RemovePortfolioButton = ({ authorId, portfolioImageId, className }: Props) => {
	const { handleRemove, isPending } = useRemovePortfolio()

	const handleClick = async () => {
		await handleRemove({ authorId, portfolioImageId })
	}

	return (
		<Button
			className={cn(className)}
			size={"icon"}
			variant={"default"}
			onClick={handleClick}
			disabled={isPending}
		>
			{isPending ? <Spinner className={"h-5 w-5"} /> : <TrashIcon className={"h-5 w-5"} />}
		</Button>
	)
}
