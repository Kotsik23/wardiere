import { FileIcon, XIcon } from "lucide-react"
import { Button } from "@/shared/ui/button.tsx"
import { Card } from "@/shared/ui/card.tsx"
import { formatFileSize } from "../lib/format-file-size.ts"

type Props = {
	file: File
	onDelete: (name: string) => void
}

export const UploadsListItem = ({ file, onDelete }: Props) => {
	return (
		<Card className={"flex justify-between p-2"}>
			<div className={"flex items-start gap-4"}>
				<Card className={"p-1"}>
					<FileIcon />
				</Card>
				<div className={"flex flex-col items-start gap-1"}>
					<h6 className={"font-medium"}>{file.name}</h6>
					<span className={"text-sm text-muted-foreground"}>{formatFileSize(file.size)}</span>
				</div>
			</div>
			<Button
				variant={"ghost"}
				size={"icon"}
				className={"h-8 w-8 text-muted-foreground hover:text-destructive"}
				onClick={() => onDelete(file.name)}
			>
				<XIcon className={"h-5 w-5"} />
			</Button>
		</Card>
	)
}
