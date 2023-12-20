import { FolderIcon } from "lucide-react"
import { ChangeEvent, useRef } from "react"
import { Button } from "@/shared/ui/button.tsx"

type Props = {
	multiple: boolean
	accept?: string
	onChange: (files: File[]) => void
}

export const UploadFromFile = ({ multiple, onChange, accept = "image/*" }: Props) => {
	const inputRef = useRef<HTMLInputElement>(null)

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			onChange(Array.from(e.target.files))
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
