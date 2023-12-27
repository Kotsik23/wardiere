import { PlusIcon } from "lucide-react"
import { useBoolean } from "usehooks-ts"
import { Id } from "@convex/_generated/dataModel"
import { UploadDialog } from "@/features/upload-files"
import { Button } from "@/shared/ui/button.tsx"
import { cn } from "@/shared/ui/util.ts"
import { useUploadAuthorPhoto } from "../model/use-upload-author-photo.ts"

type Props = {
	authorId: Id<"authors">
	className?: string
}

export const UploadAuthorPhotoButton = ({ authorId, className }: Props) => {
	const { value: open, setValue: onOpenChange, toggle } = useBoolean()
	const { handleUploadPhoto } = useUploadAuthorPhoto()

	const handleUpload = async ({ buffers }: { buffers: ArrayBuffer[] }) => {
		await handleUploadPhoto({ authorId, arrayBuffer: buffers[0] })
	}

	return (
		<>
			<Button onClick={toggle} className={cn("w-full max-w-sm", className)}>
				Upload <PlusIcon className={"ml-2"} />
			</Button>
			<UploadDialog
				multiple={false}
				open={open}
				onOpenChange={onOpenChange}
				onUpload={handleUpload}
			/>
		</>
	)
}
