import { cn } from "@/shared/ui/util.ts"

type LogoProps = {
	className?: string
}

export const Logo = ({ className }: LogoProps) => {
	return <h1 className={cn("font-logo text-3xl font-medium", className)}>WARDIERE</h1>
}
