import { ArrowRightIcon, LightbulbIcon } from "lucide-react"
import { Id } from "@convex/_generated/dataModel"
import { ROUTES } from "@/shared/constants/routes.ts"
import { Badge } from "@/shared/ui/badge.tsx"
import { NavigationLink } from "@/shared/ui/links"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/shared/ui/tooltip.tsx"
import { cn } from "@/shared/ui/util.ts"

type Props = {
	authorId: Id<"authors">
	className?: string
}

export const YoursAuthorBadge = ({ authorId, className }: Props) => {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger className={"hover:cursor-default"}>
					<Badge
						className={cn(
							"w-fit bg-yellow-500 p-1 font-semibold uppercase hover:bg-yellow-500/90 dark:bg-yellow-400 dark:hover:bg-yellow-400/90",
							className
						)}
					>
						<LightbulbIcon className={"size-5"} />
					</Badge>
				</TooltipTrigger>
				<TooltipContent>
					<NavigationLink to={ROUTES.AUTHOR_EDIT(authorId)} className={"flex items-center"}>
						Yours Brand <ArrowRightIcon className={"ml-2 size-4"} />
					</NavigationLink>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}
