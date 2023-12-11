import { MoonIcon, SunIcon } from "lucide-react"
import { Switch } from "@/shared/ui/switch.tsx"
import { useThemeSwitcher } from "../model/use-theme-switcher.tsx"

export const ThemeSwitcher = () => {
	const { isDark, handleThemeSwitch } = useThemeSwitcher()

	return (
		<div className={"flex items-center gap-1"}>
			<SunIcon className={"h-5 w-5"} />
			<Switch checked={isDark} onCheckedChange={handleThemeSwitch} />
			<MoonIcon className={"h-5 w-5"} />
		</div>
	)
}
