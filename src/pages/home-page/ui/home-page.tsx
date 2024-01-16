import { HeroSection } from "@/widgets/hero"
import { PageLayout } from "@/shared/ui/layouts"

export const HomePage = () => {
	return (
		<PageLayout className={"flex flex-col gap-4"}>
			<HeroSection />
		</PageLayout>
	)
}
