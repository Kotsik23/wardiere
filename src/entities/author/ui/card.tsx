import { ArrowRightIcon } from "lucide-react"
import { ReactNode } from "react"
import { Link } from "react-router-dom"
import { Doc } from "@convex/_generated/dataModel"
import { ROUTES } from "@/shared/constants/routes.ts"
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar.tsx"
import { Button } from "@/shared/ui/button.tsx"
import {
	Card as UiCard,
	CardContent as UiCardContent,
	CardFooter as UiCardFooter,
	CardHeader as UiCardHeader,
} from "@/shared/ui/card.tsx"
import { useIsNew } from "../model/use-is-new.ts"
import { Keywords } from "./keywords.tsx"
import { NewBadge } from "./new-badge.tsx"

type AuthorCardProps = {
	data: Doc<"author">
	actions: ReactNode
}

export const Card = ({ data, actions }: AuthorCardProps) => {
	const isNew = useIsNew(data._creationTime)

	return (
		<UiCard className={"relative"}>
			<UiCardHeader className={"flex flex-row items-center gap-4"}>
				<Avatar className={"h-14 w-14 rounded-md shadow-lg md:h-20 md:w-20"}>
					<AvatarImage
						src={"https://ik.imagekit.io/k3z5s13bx/5979737.jpg?updatedAt=1702390501155"}
						className={"object-cover"}
					/>
					<AvatarFallback>{data.brand?.at(0)}</AvatarFallback>
				</Avatar>
				<div className={"flex flex-col items-start gap-0.5"}>
					<h3 className={"text-lg font-semibold md:text-xl"}>{data.brand}</h3>
					<span className={"text-sm font-medium text-secondary md:text-base"}>
						{data.contacts?.email}
					</span>
				</div>
			</UiCardHeader>
			<UiCardContent>
				<Keywords words={data.keywords ?? []} />
			</UiCardContent>
			<UiCardFooter className={"flex flex-col items-start gap-2"}>
				{actions}
				<Button variant={"outline"} className={"group w-full"} asChild>
					<Link to={ROUTES.AUTHOR(data._id)}>
						Learn More
						<ArrowRightIcon
							className={"ml-2 h-5 w-5 transition-transform group-hover:translate-x-2"}
						/>
					</Link>
				</Button>
			</UiCardFooter>
			{isNew && <NewBadge className={"absolute right-4 top-4"} />}
		</UiCard>
	)
}
