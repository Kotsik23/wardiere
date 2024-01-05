import { useState } from "react"

export const useUploadDialog = ({ multiple = false }: { multiple?: boolean }) => {
	const [files, setFiles] = useState<File[]>([])

	const onClear = () => {
		setFiles([])
	}

	const onAdd = (newFiles: File[]) => {
		if (files.length > 0 && multiple) {
			setFiles(prevFiles => {
				const updatedFiles = newFiles.filter(
					newFile => !prevFiles.some(prevFile => prevFile.name === newFile.name)
				)
				return [...prevFiles, ...updatedFiles]
			})
		} else {
			setFiles(newFiles)
		}
	}

	const onDelete = (name: string) => {
		setFiles(files.filter(file => file.name !== name))
	}

	return { files, onAdd, onClear, onDelete }
}
