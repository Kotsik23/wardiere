import { ReactNode } from "react"
import { cn } from "../util.ts"

type PageLayoutProps = {
	children: ReactNode
	className?: string
}

export const PageLayout = ({ children, className }: PageLayoutProps) => {
	return <main className={cn("mb-10 mt-24", className)}>{children}</main>
}
