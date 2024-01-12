import { CarouselBanner } from "@/widgets/carousel-banner"
import { PageLayout } from "@/shared/ui/layouts"

export const HomePage = () => {
	return (
		<PageLayout className={"container my-8 flex flex-col gap-4"}>
			<CarouselBanner />
			HomePage
		</PageLayout>
	)
}
