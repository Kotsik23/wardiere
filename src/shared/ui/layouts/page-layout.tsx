import { ReactNode } from "react"
import { cn } from "../util.ts"

type PageLayoutProps = {
	children: ReactNode
	className?: string
}

export const PageLayout = ({ children, className }: PageLayoutProps) => {
	return <main className={cn("flex-1", className)}>{children}</main>
}
