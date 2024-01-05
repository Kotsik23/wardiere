import { Toaster } from "sonner"
import { useTheme } from "@/features/toggle-theme"

export const ToasterProvider = () => {
	const { theme } = useTheme()

	return (
		<Toaster position={"bottom-center"} closeButton richColors duration={3000} theme={theme} />
	)
}
