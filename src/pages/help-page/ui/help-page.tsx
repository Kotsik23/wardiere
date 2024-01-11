import { HelpCard } from "@/entities/help"
import { ROUTES } from "@/shared/constants/routes.ts"
import { Breadcrumbs } from "@/shared/ui/breadcrumbs.tsx"
import { PageLayout } from "@/shared/ui/layouts"
import { helpData } from "../model/help-data.ts"

export const HelpPage = () => {
	return (
		<>
			<Breadcrumbs className={"container mt-6"} pages={[{ name: "Help", href: ROUTES.HELP }]} />
			<PageLayout className={"container my-8 flex flex-col items-center gap-12"}>
				<h2 className={"text-center text-3xl font-bold md:text-4xl lg:text-5xl xl:text-6xl"}>
					How can we help?
				</h2>
				<section className={"grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"}>
					{helpData.map(data => (
						<HelpCard key={data.title} {...data} />
					))}
				</section>
			</PageLayout>
		</>
	)
}
