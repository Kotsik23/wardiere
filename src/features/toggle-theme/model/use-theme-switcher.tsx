import { useTheme } from "./theme-provider.tsx"

export const useThemeSwitcher = () => {
	const { theme, setTheme } = useTheme()

	const handleThemeSwitch = (checked: boolean) => {
		setTheme(checked ? "dark" : "light")
	}

	return {
		isDark: theme === "dark",
		handleThemeSwitch,
	}
}
