import { useAction } from "convex/react"
import { toast } from "sonner"
import { api } from "@convex/_generated/api"
import { unexpectedErrorToast } from "@/shared/ui/toasts"

export const useUploadAuthorPhoto = () => {
	const uploadPhotoAction = useAction(api.authors.updatePhoto)

	const handleUploadPhoto = async (args: Parameters<typeof uploadPhotoAction>[0]) => {
		try {
			await uploadPhotoAction(args)
			toast.success("Successfully uploaded")
		} catch (error) {
			unexpectedErrorToast()
		}
	}

	return {
		handleUploadPhoto,
	}
}
