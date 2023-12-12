import { Button } from "@/shared/ui/button.tsx"

type FilterHeaderProps = {
	title: string
	hasSelection: boolean
	onReset: () => void
}

export const FilterHeader = ({ title, hasSelection, onReset }: FilterHeaderProps) => {
	return (
		<div className={"flex flex-wrap items-center justify-between gap-4"}>
			<h2 className={"text-lg font-semibold"}>{title}</h2>
			<Button
				variant={"outline"}
				disabled={!hasSelection}
				className={"h-fit rounded-full px-3 py-1"}
				onClick={onReset}
			>
				Reset
			</Button>
		</div>
	)
}
