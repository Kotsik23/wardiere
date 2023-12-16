import { ReactNode } from "react"
import { cn } from "../util.ts"

type PageLayoutProps = {
	children: ReactNode
	className?: string
}

export const PageLayout = ({ children, className }: PageLayoutProps) => {
	return <main className={cn("my-20", className)}>{children}</main>
}
