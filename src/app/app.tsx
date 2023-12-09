import { BrowserRouter } from "react-router-dom"

import { ClerkProvider } from "@/app/providers/clerk-provider.tsx"
import { ConvexProvider } from "@/app/providers/convex-provider.tsx"
import { QueryParamProvider } from "@/app/providers/query-param-provider.tsx"
import { RouterProvider } from "@/app/providers/router-provider.tsx"
import { ThemeProvider } from "@/app/providers/theme-provider.tsx"

import { WithSplashScreen } from "@/widgets/with-splash-screen"

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
