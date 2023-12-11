import { BrowserRouter } from "react-router-dom"
import { WithSplashScreen } from "@/widgets/with-splash-screen"
import { ThemeProvider } from "@/features/theme-switcher"
import { ClerkProvider } from "./providers/clerk-provider.tsx"
import { ConvexProvider } from "./providers/convex-provider.tsx"
import { QueryParamProvider } from "./providers/query-param-provider.tsx"
import { RouterProvider } from "./providers/router-provider.tsx"

export const App = () => {
	return (
		<BrowserRouter>
			<QueryParamProvider>
				<ThemeProvider defaultTheme={"system"}>
					<ClerkProvider>
						<ConvexProvider>
							<WithSplashScreen>
								<RouterProvider />
							</WithSplashScreen>
						</ConvexProvider>
					</ClerkProvider>
				</ThemeProvider>
			</QueryParamProvider>
		</BrowserRouter>
	)
}
