import { Id } from "@convex/_generated/dataModel"
import { PortfolioImage } from "@/entities/author"
import { Button } from "@/shared/ui/button.tsx"
import {
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/shared/ui/dialog.tsx"

type Props = {
	portfolioId: Id<"portfolios">
	url: string
}

export const PortfolioPreview = ({ portfolioId, url }: Props) => {
	return (
		<DialogContent className={"max-w-xl"}>
			<DialogHeader>
				<DialogTitle className={"text-xl"}>Portfolio Preview</DialogTitle>
			</DialogHeader>
			<PortfolioImage portfolioId={portfolioId} url={url} containerClassName={"max-w-full"} />
			<DialogFooter>
				<DialogClose asChild>
					<Button className={"w-full"}>Close preview</Button>
				</DialogClose>
			</DialogFooter>
		</DialogContent>
	)
}
