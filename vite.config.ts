import path from "path"
import react from "@vitejs/plugin-react"
import { visualizer } from "rollup-plugin-visualizer"
import { defineConfig, PluginOption } from "vite"
import { splitVendorChunkPlugin } from "vite"

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), splitVendorChunkPlugin(), visualizer() as PluginOption],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
			"@convex": path.resolve(__dirname, "./convex"),
		},
	},
	build: {
		rollupOptions: {
			output: {
				manualChunks: (id: string) => {
					if (id.includes("@radix-ui") || id.includes("@floating-ui")) {
						return "@radix-ui"
					}
					if (
						id.includes("react-router-dom") ||
						id.includes("@remix-run") ||
						id.includes("react-router")
					) {
						return "@react-router"
					}
					if (id.includes("tailwind-merge")) {
						return "tailwind-merge"
					}
					if (id.includes("convex")) {
						return "convex"
					}
					if (id.includes("lucide-react")) {
						return "lucide-react"
					}
					if (id.includes("use-query-params") || id.includes("serialize-query-params")) {
						return "use-query-params"
					}
					if (id.includes("sonner")) {
						return "sonner"
					}
					if (id.includes("swiper")) {
						return "swiper"
					}
				},
			},
		},
	},
})
