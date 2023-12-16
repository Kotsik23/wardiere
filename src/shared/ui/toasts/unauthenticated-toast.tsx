import { toast } from "sonner"

export const unauthenticatedToast = () => {
	return toast.error("Authenticated required")
}
