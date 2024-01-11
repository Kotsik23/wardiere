import { ArrowRightIcon } from "lucide-react"
import { Button } from "@/shared/ui/button.tsx"
import { Card } from "@/shared/ui/card.tsx"
import { ProgressiveImage } from "@/shared/ui/progressive-image.tsx"
import { cn } from "@/shared/ui/util.ts"

type Props = {
	className?: string
	image: string
	title: string
	href: string
}

export const HelpCard = ({ image, title, href, className }: Props) => {
	return (
		<article className={cn("flex max-w-md flex-col items-start gap-4", className)}>
			<Card className={"relative aspect-video overflow-hidden"}>
				<ProgressiveImage
					className={"h-full w-full object-cover"}
					src={image + "?tr=fo-auto"}
					placeholder={image + "?tr=fo-auto,q-1"}
					alt={title}
				/>
			</Card>
			<Button variant={"ghost"} className={"group text-base"}>
				{title}{" "}
				<ArrowRightIcon
					className={"ml-2 size-5 transition-transform group-hover:translate-x-1"}
				/>
			</Button>
		</article>
	)
}
