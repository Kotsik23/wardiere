import { UploadIcon } from "lucide-react"
import { useState } from "react"
import { Button } from "@/shared/ui/button.tsx"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/shared/ui/dialog.tsx"
import { unexpectedErrorToast } from "@/shared/ui/toasts"
import { useUploadDialog } from "../model/use-upload-dialog.ts"
import { UploadFromFile } from "./upload-from-file.tsx"
import { UploadsList } from "./uploads-list.tsx"

type Props = {
	multiple: boolean
	open: boolean
	onOpenChange: (open: boolean) => void
	onUpload: ({ buffers }: { buffers: ArrayBuffer[] }) => Promise<void>
}

export const UploadDialog = ({ multiple, onOpenChange, open, onUpload }: Props) => {
	const [isPending, setIsPending] = useState<boolean>(false)
	const { files, onAdd, onClear, onDelete } = useUploadDialog()

	const handleUpload = async () => {
		try {
			setIsPending(true)
			const buffers = await Promise.all(files.map(file => file.arrayBuffer()))
			await onUpload({ buffers })
			onOpenChange(false)
			onClear()
		} catch (error) {
			unexpectedErrorToast()
		} finally {
			setIsPending(false)
		}
	}

	const isDisabled = files.length <= 0 || isPending

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className={"text-2xl"}>Upload files</DialogTitle>
					<DialogDescription>{multiple ? "Multiple" : "Single"} upload</DialogDescription>
				</DialogHeader>
				<fieldset
					disabled={isPending}
					className={
						"group relative flex flex-col justify-center gap-2 disabled:pointer-events-none disabled:opacity-50"
					}
				>
					<div className={"flex flex-col gap-4"}>
						<UploadFromFile multiple={multiple} onChange={onAdd} />
						<UploadsList files={files} onDelete={onDelete} />
					</div>
					<DialogFooter className={"gap-2"}>
						<Button variant={"outline"} onClick={onClear} disabled={isDisabled}>
							Clear
						</Button>
						<Button disabled={isDisabled} onClick={handleUpload}>
							Upload <UploadIcon className={"ml-2 h-5 w-5"} />
						</Button>
					</DialogFooter>
				</fieldset>
			</DialogContent>
		</Dialog>
	)
}
