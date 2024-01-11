import { MoreHorizontalIcon, SearchIcon } from "lucide-react"
import { Doc } from "@convex/_generated/dataModel"
import { PortfolioPreview, RemovePortfolio } from "@/features/author/portfolio-actions"
import { Button } from "@/shared/ui/button.tsx"
import { Dialog, DialogTrigger } from "@/shared/ui/dialog.tsx"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu.tsx"
import { cn } from "@/shared/ui/util.ts"

type Props = {
	portfolio: Doc<"portfolios">
	editable?: boolean
	triggerClassName?: string
}

export const PortfolioActions = ({ portfolio, editable = false, triggerClassName }: Props) => {
	return (
		<Dialog>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						size={"icon"}
						variant={"outline"}
						className={cn("size-8 md:size-7", triggerClassName)}
					>
						<MoreHorizontalIcon className={"size-6 md:size-5"} />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DialogTrigger asChild>
						<DropdownMenuItem>
							<SearchIcon className={"mr-2 size-5"} />
							Open Preview
						</DropdownMenuItem>
					</DialogTrigger>
					{editable && <RemovePortfolio portfolioId={portfolio._id} />}
				</DropdownMenuContent>
			</DropdownMenu>
			<PortfolioPreview url={portfolio.url} />
		</Dialog>
	)
}
