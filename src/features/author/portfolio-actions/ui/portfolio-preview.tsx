import { Button } from "@/shared/ui/button.tsx"
import {
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/shared/ui/dialog.tsx"
import { ProgressiveImage } from "@/shared/ui/progressive-image.tsx"

type Props = {
	url: string
}

export const PortfolioPreview = ({ url }: Props) => {
	return (
		<DialogContent className={"max-w-xl"}>
			<DialogHeader>
				<DialogTitle className={"text-xl"}>Portfolio Preview</DialogTitle>
			</DialogHeader>
			<div className={"overflow-hidden rounded-xl shadow-lg"}>
				<ProgressiveImage
					loading={"lazy"}
					alt={"preview"}
					placeholder={url + "?tr=fo-auto,w-0.05,h-0.05,q-1"}
					src={url + "?tr=fo-auto,q-90"}
					className={"aspect-square h-full w-full object-cover"}
				/>
			</div>
			<DialogFooter>
				<DialogClose asChild>
					<Button className={"w-full"}>Close preview</Button>
				</DialogClose>
			</DialogFooter>
		</DialogContent>
	)
}
