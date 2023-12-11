import { useMediaQuery } from "usehooks-ts"
import { cn } from "./util.ts"

type LogoProps = {
	className?: string
	isFull?: boolean
}

export const Logo = ({ className, isFull = false }: LogoProps) => {
	const isMedium = useMediaQuery("(min-width: 768px)")

	const logoText = isFull ? "WARDIERE" : isMedium ? "WARDIERE" : "WR"

	return <h1 className={cn("font-logo text-3xl font-medium uppercase", className)}>{logoText}</h1>
}
