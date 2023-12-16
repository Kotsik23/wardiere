import { lazy, Suspense } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { HomePage } from "@/pages/home-page"
import { NavBar } from "@/widgets/navigation"
import { ROUTES } from "@/shared/constants/routes.ts"
import { PageLoader } from "@/shared/ui/page-loader.tsx"

const ExplorePage = lazy(() =>
	import("@/pages/explore-page").then(value => ({ default: value.ExplorePage }))
)
const HelpPage = lazy(() =>
	import("@/pages/help-page").then(value => ({ default: value.HelpPage }))
)
const AuthorPage = lazy(() =>
	import("@/pages/author-page").then(value => ({ default: value.AuthorPage }))
)

export const RouterProvider = () => {
	return (
		<>
			<NavBar />
			<Suspense fallback={<PageLoader />}>
				<Routes>
					<Route element={<HomePage />} path={ROUTES.HOME} />
					<Route element={<ExplorePage />} path={ROUTES.EXPLORE} />
					<Route element={<HelpPage />} path={ROUTES.HELP} />
					<Route element={<AuthorPage />} path={ROUTES.AUTHOR(":id")} />

					<Route element={<Navigate to={ROUTES.HOME} replace />} path={ROUTES.UNKNOWN} />
				</Routes>
			</Suspense>
		</>
	)
}
