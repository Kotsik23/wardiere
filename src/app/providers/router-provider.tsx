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
const HelpSecurityPage = lazy(() =>
	import("@/pages/help-page").then(value => ({ default: value.HelpSecurityPage }))
)
const HelpYourAccountPage = lazy(() =>
	import("@/pages/help-page").then(value => ({ default: value.HelpYourAccountPage }))
)
const HelpWardiereDzenPage = lazy(() =>
	import("@/pages/help-page").then(value => ({ default: value.HelpWardiereDzenPage }))
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

					<Route element={<HelpPage />} path={ROUTES.HELP} />
					<Route element={<HelpSecurityPage />} path={ROUTES.HELP_SECURITY} />
					<Route element={<HelpYourAccountPage />} path={ROUTES.HELP_YOUR_ACCOUNT} />
					<Route element={<HelpWardiereDzenPage />} path={ROUTES.HELP_WARDIERE_DZEN} />

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
