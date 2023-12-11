import { Toaster } from "sonner"
import { useTheme } from "@/features/theme-switcher"

export const ToasterProvider = () => {
	const { theme } = useTheme()

	return (
		<Toaster position={"bottom-center"} closeButton richColors duration={4000} theme={theme} />
	)
}
