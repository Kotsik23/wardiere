import { toast } from "sonner"

export const unexpectedErrorToast = () => {
	return toast.error("Unexpected error occurred")
}
