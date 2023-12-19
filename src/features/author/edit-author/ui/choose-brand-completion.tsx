import { useState } from "react"
import { Button } from "@/shared/ui/button.tsx"
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/shared/ui/dialog.tsx"
import { Label } from "@/shared/ui/label.tsx"
import { RadioGroup, RadioGroupItem } from "@/shared/ui/radio-group.tsx"
import { BrandCompletionType } from "../model/types.ts"

type Props = {
	open: boolean
	onOpenChange: (open: boolean) => void
	completions: BrandCompletionType
	onChoose: (selected: string) => void
}

export const ChooseBrandCompletion = ({ open, onOpenChange, completions, onChoose }: Props) => {
	const [selected, setSelected] = useState<string>(completions.brands[0])

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Choose brand completion</DialogTitle>
				</DialogHeader>
				<RadioGroup value={selected} onValueChange={setSelected}>
					{completions.brands.map((completion, index) => (
						<div key={`brand-completion-${index}`} className={"flex items-center gap-3"}>
							<RadioGroupItem id={completion} value={completion} />
							<Label htmlFor={completion} className={"text-lg capitalize"}>
								{completion}
							</Label>
						</div>
					))}
				</RadioGroup>
				<DialogFooter>
					<Button variant={"outline"} onClick={() => onOpenChange(false)}>
						Cancel
					</Button>
					<Button onClick={() => onChoose(selected)}>Choose</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
