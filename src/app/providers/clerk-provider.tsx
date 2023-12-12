import { ClerkProvider as ReactClerkProvider } from "@clerk/clerk-react"
import { dark } from "@clerk/themes"
import { ReactNode } from "react"
import { useTheme } from "@/features/theme-switcher"

const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!publishableKey) {
	throw new Error("Clerk public key is missing. Check env")
}

export const ClerkProvider = ({ children }: { children: ReactNode }) => {
	const { theme } = useTheme()
	const isDark = theme === "dark"

	return (
		<ReactClerkProvider
			publishableKey={publishableKey}
			appearance={{
				baseTheme: isDark ? dark : undefined,
				variables: {
					colorPrimary: isDark ? "hsl(235, 80%, 73%)" : "hsl(221, 82%, 62%)",
					colorBackground: isDark ? "hsl(240, 10%, 3.9%)" : "hsl(0, 0%, 100%)",
					colorDanger: isDark ? "hsl(358, 94%, 62%)" : "hsl(357, 79%, 53%)",
					borderRadius: "0.5rem",
				},
				elements: {
					card: "border border-border",
					formFieldInput: "bg-background",
					logoBox: "flex justify-center items-center",
					logoImage: "hover:bg-accent rounded-md p-2 transition-colors",
				},
			}}
		>
			{children}
		</ReactClerkProvider>
	)
}
