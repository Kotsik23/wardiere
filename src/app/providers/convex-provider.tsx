import { useAuth } from "@clerk/clerk-react"

import { ConvexReactClient } from "convex/react"
import { ConvexProviderWithClerk } from "convex/react-clerk"

import { ReactNode } from "react"

const convexUrl = import.meta.env.VITE_CONVEX_URL

if (!convexUrl) {
	throw new Error("Convex URL is missing. Check env")
}

const client = new ConvexReactClient(convexUrl)

export const ConvexProvider = ({ children }: { children: ReactNode }) => {
	return (
		<ConvexProviderWithClerk client={client} useAuth={useAuth}>
			{children}
		</ConvexProviderWithClerk>
	)
}
