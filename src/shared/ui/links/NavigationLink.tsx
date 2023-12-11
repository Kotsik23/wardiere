import { cva, VariantProps } from "class-variance-authority"
import React from "react"
import { NavLink, NavLinkProps } from "react-router-dom"
import { cn } from "../util.ts"

const navigationLinkVariants = cva(
	[
		"focus-visible:outline-none focus-visible:ring focus-visible:ring-ring focus-visible:ring-offset-background",
		"text-base font-normal",
	],
	{
		variants: {
			variant: {
				default: "hover:text-foreground/70 text-foreground transition-colors",
				underline: "hover:underline",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	}
)

export interface NavigationLinkProps
	extends NavLinkProps,
		VariantProps<typeof navigationLinkVariants> {}

export const NavigationLink = React.forwardRef<
	React.ElementRef<typeof NavLink>,
	NavigationLinkProps
>(({ to, children, className, variant, ...props }, ref) => {
	return (
		<NavLink
			to={to}
			className={cn(navigationLinkVariants({ variant, className }))}
			ref={ref}
			{...props}
		>
			{children}
		</NavLink>
	)
})
