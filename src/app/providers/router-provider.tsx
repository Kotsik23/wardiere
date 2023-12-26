import { lazy, Suspense } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { HomePage } from "@/pages/home-page"
import { NavBar } from "@/widgets/navigation"
import { ProtectedRoute } from "@/widgets/routes"
import { ROUTES } from "@/shared/constants/routes.ts"
import { PageLoader } from "@/shared/ui/loaders"

const ExplorePage = lazy(() =>
	import("@/pages/explore-page").then(value => ({ default: value.ExplorePage }))
)
const HelpPage = lazy(() =>
	import("@/pages/help-page").then(value => ({ default: value.HelpPage }))
)
const SettingsPage = lazy(() =>
	import("@/pages/settings-page").then(value => ({ default: value.SettingsPage }))
)
const AuthorPage = lazy(() =>
	import("@/pages/author-page").then(value => ({ default: value.AuthorPage }))
)
const AuthorEditPage = lazy(() =>
	import("@/pages/author-page").then(value => ({ default: value.AuthorEditPage }))
)
const SignInPage = lazy(() =>
	import("@/pages/auth-page").then(value => ({ default: value.SignInPage }))
)
const SignUpPage = lazy(() =>
	import("@/pages/auth-page").then(value => ({ default: value.SignUpPage }))
)

export const RouterProvider = () => {
	return (
		<>
			<NavBar />
			<Suspense fallback={<PageLoader />}>
				<Routes>
					<Route element={<HomePage />} path={ROUTES.HOME} />
					<Route element={<ExplorePage />} path={ROUTES.EXPLORE} />
					<Route
						element={
							<ProtectedRoute>
								<HelpPage />
							</ProtectedRoute>
						}
						path={ROUTES.HELP}
					/>
					<Route
						element={
							<ProtectedRoute>
								<SettingsPage />
							</ProtectedRoute>
						}
						path={ROUTES.SETTINGS}
					/>

					<Route element={<SignInPage />} path={ROUTES.SIGN_IN} />
					<Route element={<SignUpPage />} path={ROUTES.SIGN_UP} />

					<Route element={<AuthorPage />} path={ROUTES.AUTHOR(":id")} />
					<Route
						element={
							<ProtectedRoute>
								<AuthorEditPage />
							</ProtectedRoute>
						}
						path={ROUTES.AUTHOR_EDIT(":id")}
					/>

					<Route element={<Navigate to={ROUTES.HOME} replace />} path={ROUTES.UNKNOWN} />
				</Routes>
			</Suspense>
		</>
	)
}
