import { SparklesIcon } from "lucide-react"
import { Button } from "@/shared/ui/button.tsx"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/shared/ui/tooltip.tsx"
import { cn } from "@/shared/ui/util.ts"

type CompletionButtonProps = {
	completionFn: () => void
	isPending: boolean
	className?: string
}

export const CompletionButton = ({ completionFn, isPending, className }: CompletionButtonProps) => {
	return (
		<TooltipProvider delayDuration={100}>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button
						size={"icon"}
						className={cn("rounded-full", className)}
						disabled={isPending}
						onClick={completionFn}
					>
						<SparklesIcon />
					</Button>
				</TooltipTrigger>
				<TooltipContent>
					<p className={"capitalize"}>AI Generate</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}
