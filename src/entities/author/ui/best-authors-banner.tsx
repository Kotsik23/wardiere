import { UserJSON } from "@clerk/backend"
import {
	ArrowRightIcon,
	GalleryHorizontalEndIcon,
	HeartIcon,
	MessageSquareIcon,
	MoreVerticalIcon,
	TrophyIcon,
} from "lucide-react"
import { Link } from "react-router-dom"
import { Doc } from "@convex/_generated/dataModel"
import { ROUTES } from "@/shared/constants/routes.ts"
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar.tsx"
import { Button } from "@/shared/ui/button.tsx"
import { Card } from "@/shared/ui/card.tsx"
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover.tsx"
import { Skeleton } from "@/shared/ui/skeleton.tsx"
import { StatItem } from "@/shared/ui/stat-item.tsx"
import { cn } from "@/shared/ui/util.ts"
import { useBestAuthors } from "../model/queries.ts"

type Stats = {
	likes: number
	comments: number
	portfolios: number
}

export const BestAuthorsBanner = () => {
	const authors = useBestAuthors({ take: 3 })

	if (!authors) {
		return <Skeleton className={"h-full w-full"} />
	}

	return (
		<Card className={"h-full"}>
			<div className={"flex flex-col p-4 lg:p-8"}>
				<h2
					className={
						"flex items-center bg-gradient-to-r from-secondary to-violet-500 bg-clip-text text-xl font-bold uppercase text-transparent drop-shadow-sm md:text-2xl lg:text-4xl dark:to-violet-400"
					}
				>
					<TrophyIcon className={"mr-4 size-7 text-yellow-500 dark:text-yellow-400"} /> BEST OF
					THE BEST
				</h2>
				<div className={"mt-4 flex flex-col divide-y"}>
					{authors.map(author => (
						<BestAuthor key={author._id} author={author} />
					))}
				</div>
			</div>
		</Card>
	)
}

const BestAuthor = ({
	author,
}: {
	author: Doc<"authors"> & {
		user: UserJSON
		stats: Stats
	}
}) => {
	return (
		<div className={"flex items-center justify-between py-2 md:py-5"}>
			<div className={"flex items-center gap-2"}>
				<Avatar className={"h-9 w-9 md:h-10 md:w-10"}>
					<AvatarFallback>{author.user.username}</AvatarFallback>
					<AvatarImage
						src={author.photo?.url || author.user.image_url}
						className={"object-cover"}
					/>
				</Avatar>
				<div className={"flex flex-col items-start"}>
					{author.brand && (
						<Link
							to={ROUTES.AUTHOR(author._id)}
							className={"font-semibold leading-tight hover:underline md:text-lg"}
						>
							{author.brand}
						</Link>
					)}
					<p className={"text-secondary"}>@{author.user.username}</p>
				</div>
			</div>
			<div className={"flex items-center gap-2 md:gap-12"}>
				<Stats stats={author.stats} className={"hidden md:flex"} />
				<Popover>
					<PopoverTrigger asChild className={"flex md:hidden"}>
						<Button size={"icon"} variant={"ghost"}>
							<MoreVerticalIcon className={"size-5"} />
						</Button>
					</PopoverTrigger>
					<PopoverContent className={"w-fit p-2"} align={"end"}>
						<Stats stats={author.stats} />
					</PopoverContent>
				</Popover>
				<Button size={"icon"} variant={"secondary"} className={"h-8 w-8"} asChild>
					<Link to={ROUTES.AUTHOR(author._id)}>
						<ArrowRightIcon className={"size-5"} />
					</Link>
				</Button>
			</div>
		</div>
	)
}

const Stats = ({ stats, className }: { stats: Stats; className?: string }) => {
	return (
		<div className={cn("flex items-center gap-3", className)}>
			<StatItem
				icon={HeartIcon}
				value={stats.likes}
				className={"fill-destructive text-destructive"}
			/>
			<StatItem
				icon={MessageSquareIcon}
				value={stats.comments}
				className={"fill-blue-500 text-blue-500 dark:fill-blue-400 dark:text-blue-400"}
			/>
			<StatItem
				icon={GalleryHorizontalEndIcon}
				value={stats.portfolios}
				className={"fill-orange-500 text-orange-500 dark:fill-orange-400 dark:text-orange-400"}
			/>
		</div>
	)
}
