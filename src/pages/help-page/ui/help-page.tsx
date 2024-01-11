import { ROUTES } from "@/shared/constants/routes.ts"
import { Breadcrumbs } from "@/shared/ui/breadcrumbs.tsx"
import { PageLayout } from "@/shared/ui/layouts"

export const HelpPage = () => {
	return (
		<>
			<Breadcrumbs className={"container mt-6"} pages={[{ name: "Help", href: ROUTES.HELP }]} />
			<PageLayout className={"container my-8"}>HelpPage</PageLayout>
		</>
	)
}
