import { MoonIcon, SunIcon } from "lucide-react"

import { useTheme } from "@/app/providers/theme-provider.tsx"

import { Switch } from "@/shared/ui/switch.tsx"

export const ThemeSwitcher = () => {
	const { theme, setTheme } = useTheme()

	const handleCheckedChange = (checked: boolean) => {
		setTheme(checked ? "dark" : "light")
	}

	return (
		<div className={"flex items-center gap-1"}>
			<SunIcon className={"h-5 w-5"} />
			<Switch checked={theme === "dark"} onCheckedChange={handleCheckedChange} />
			<MoonIcon className={"h-5 w-5"} />
		</div>
	)
}
