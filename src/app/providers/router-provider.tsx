import { Navigate, Route, Routes } from "react-router-dom"

import { HomePage } from "@/pages"

import { ROUTES } from "@/shared/constants/routes.ts"

export const RouterProvider = () => {
	return (
		<Routes>
			<Route element={<HomePage />} path={ROUTES.HOME} />

			<Route element={<Navigate to={ROUTES.HOME} replace />} path={ROUTES.UNKNOWN} />
		</Routes>
	)
}
