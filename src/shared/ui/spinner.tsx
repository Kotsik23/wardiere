import { LoaderIcon } from "lucide-react"
import { cn } from "./util.ts"

type SpinnerProps = {
	className?: string
}

export const Spinner = ({ className }: SpinnerProps) => {
	return <LoaderIcon className={cn("h-8 w-8 animate-spin", className)} />
}
