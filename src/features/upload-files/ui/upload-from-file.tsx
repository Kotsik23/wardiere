import { FolderIcon } from "lucide-react"
import { ChangeEvent, useRef } from "react"
import { toast } from "sonner"
import { Button } from "@/shared/ui/button.tsx"

type Props = {
	multiple: boolean
	accept?: string
	onChange: (files: File[]) => void
}

export const UploadFromFile = ({ multiple, onChange, accept = "image/*" }: Props) => {
	const inputRef = useRef<HTMLInputElement>(null)

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files
		if (files) {
			const validFiles = Array.from(files).filter(file => file.size <= 1048576) // Фильтрация файлов размером до 1 МБ
			if (validFiles.length !== files.length) {
				toast.warning("Some files were skipped because their size exceeds 1 MB.")
			}
			onChange(validFiles)
		}
	}

	return (
		<>
			<input
				ref={inputRef}
				hidden
				type={"file"}
				accept={accept}
				multiple={multiple}
				onChange={handleChange}
			/>
			<Button variant={"outline"} onClick={() => inputRef.current?.click()}>
				From device <FolderIcon className={"ml-2 h-5 w-5"} />
			</Button>
		</>
	)
}
