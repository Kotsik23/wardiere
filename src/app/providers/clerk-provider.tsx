import { ClerkProvider as ReactClerkProvider } from "@clerk/clerk-react"
import { ReactNode } from "react"

const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!publishableKey) {
	throw new Error("Clerk public key is missing. Check env")
}

export const ClerkProvider = ({ children }: { children: ReactNode }) => {
	return <ReactClerkProvider publishableKey={publishableKey}>{children}</ReactClerkProvider>
}
