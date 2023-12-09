import { useConvexAuth } from "convex/react"

import { ReactNode } from "react"

import { useTheme } from "@/app/providers/theme-provider.tsx"

import LogoDark from "@/shared/assets/logo_dark.svg"
import LogoLight from "@/shared/assets/logo_light.svg"

import { Spinner } from "@/shared/ui/spinner.tsx"

export const WithSplashScreen = ({ children }: { children: ReactNode }) => {
	const { theme } = useTheme()
	const { isLoading } = useConvexAuth()

	const isDark = theme === "dark"

	if (!isLoading) {
		return children
	}

	return (
		<div className={"bg-background/80 fixed inset-0 grid place-items-center backdrop-blur"}>
			<div
				className={
					"animate-in zoom-in-75 fade-in-80 flex w-full flex-col items-center duration-500"
				}
			>
				<img
					alt={"wardiere-logo"}
					src={isDark ? LogoDark : LogoLight}
					className={"h-full w-full max-w-sm object-cover"}
				/>
				<Spinner className={"text-primary h-12 w-12"} />
				<p className={"text-muted-foreground mt-3 text-base font-light tracking-wide"}>
					Initializing app...
				</p>
			</div>
		</div>
	)
}
