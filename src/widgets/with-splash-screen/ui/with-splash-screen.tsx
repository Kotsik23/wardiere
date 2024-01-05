import { useConvexAuth } from "convex/react"
import { ReactNode } from "react"
import { Logo } from "@/shared/ui/logo.tsx"
import { Spinner } from "@/shared/ui/spinner.tsx"

export const WithSplashScreen = ({ children }: { children: ReactNode }) => {
	const { isLoading } = useConvexAuth()

	if (!isLoading) {
		return children
	}

	return (
		<div className={"fixed inset-0 grid place-items-center bg-background/80 backdrop-blur"}>
			<div className={"flex w-full flex-col items-center gap-5"}>
				<Logo className={"mb-8 text-5xl"} isFull />
				<Spinner className={"h-12 w-12 text-primary"} />
				<p className={"text-base font-light tracking-wide text-muted-foreground"}>
					Initializing app...
				</p>
			</div>
		</div>
	)
}
