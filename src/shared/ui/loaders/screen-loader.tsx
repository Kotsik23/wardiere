import { Spinner } from "../spinner.tsx"
import { cn } from "../util.ts"

type ScreenLoaderProps = {
	containerClassName?: string
	spinnerClassName?: string
}

export const ScreenLoader = ({ containerClassName, spinnerClassName }: ScreenLoaderProps) => {
	return (
		<div className={cn("grid h-screen place-items-center", containerClassName)}>
			<Spinner className={cn("h-12 w-12", spinnerClassName)} />
		</div>
	)
}
