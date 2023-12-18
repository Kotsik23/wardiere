import { MoonIcon, SunIcon } from "lucide-react"
import { Switch } from "@/shared/ui/switch.tsx"
import { cn } from "@/shared/ui/util.ts"
import { useThemeSwitcher } from "../model/use-theme-switcher.tsx"

type ThemeSwitcherProps = {
	containerClassName?: string
}

export const ThemeSwitcher = ({ containerClassName }: ThemeSwitcherProps) => {
	const { isDark, handleThemeSwitch } = useThemeSwitcher()

	return (
		<div className={cn("flex items-center gap-1", containerClassName)}>
			<SunIcon className={"h-5 w-5"} />
			<Switch checked={isDark} onCheckedChange={handleThemeSwitch} aria-label={"switch-theme"} />
			<MoonIcon className={"h-5 w-5"} />
		</div>
	)
}
