import { useConvexAuth } from "convex/react"

import { ReactNode } from "react"

import { Spinner } from "@/shared/ui/spinner.tsx"

export const WithSplashScreen = ({ children }: { children: ReactNode }) => {
	const { isLoading } = useConvexAuth()

	if (!isLoading) {
		return children
	}

	return (
		<div className={"bg-background/80 fixed inset-0 grid place-items-center backdrop-blur"}>
			<div
				className={"animate-in zoom-in-75 fade-in-80 flex flex-col items-center duration-500"}
			>
				<Spinner className={"text-primary h-12 w-12"} />
			</div>
		</div>
	)
}
