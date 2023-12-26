import { useConvexAuth } from "convex/react"
import { ReactNode } from "react"
import { Navigate, useLocation } from "react-router-dom"
import { ROUTES } from "@/shared/constants/routes.ts"
import { createRedirectLink } from "@/shared/lib/create-redirect-link.ts"

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
	const location = useLocation()
	const { isAuthenticated } = useConvexAuth()

	if (!isAuthenticated) {
		return (
			<Navigate
				to={createRedirectLink({ pathname: ROUTES.SIGN_IN, to: location.pathname })}
				replace
				state={{ from: location }}
			/>
		)
	}

	return children
}
