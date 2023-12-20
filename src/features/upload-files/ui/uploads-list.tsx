import { ScrollArea } from "@/shared/ui/scroll-area.tsx"
import { UploadsListItem } from "./uploads-list-item.tsx"

type Props = {
	files: File[]
	onDelete: (name: string) => void
}

export const UploadsList = ({ files, onDelete }: Props) => {
	return (
		<ScrollArea className={"max-h-[20rem] w-full"}>
			<div className={"flex flex-col gap-2"}>
				{files.map(file => (
					<UploadsListItem key={file.name} file={file} onDelete={onDelete} />
				))}
			</div>
		</ScrollArea>
	)
}
