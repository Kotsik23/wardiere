import { BrowserRouter } from "react-router-dom"
import { ThemeProvider } from "@/features/toggle-theme"
import { ClerkProvider } from "./providers/clerk-provider.tsx"
import { ConvexProvider } from "./providers/convex-provider.tsx"
import { QueryParamProvider } from "./providers/query-param-provider.tsx"
import { RouterProvider } from "./providers/router-provider.tsx"
import { ToasterProvider } from "./providers/toaster-provider.tsx"

export const App = () => {
	return (
		<BrowserRouter>
			<QueryParamProvider>
				<ThemeProvider defaultTheme={"system"}>
					<ClerkProvider>
						<ConvexProvider>
							<RouterProvider />
							<ToasterProvider />
						</ConvexProvider>
					</ClerkProvider>
				</ThemeProvider>
			</QueryParamProvider>
		</BrowserRouter>
	)
}
