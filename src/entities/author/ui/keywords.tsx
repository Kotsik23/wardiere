import { Badge } from "@/shared/ui/badge.tsx"

type KeywordsProps = {
	words: string[]
}

export const Keywords = ({ words }: KeywordsProps) => {
	if (words.length <= 0) {
		return null
	}

	return (
		<div className={"flex max-w-full flex-wrap gap-3"}>
			{words?.map((word, i) => (
				<Badge key={`${word}-${i}`} variant={"outline"} className={"w-fit"}>
					#{word}
				</Badge>
			))}
		</div>
	)
}
