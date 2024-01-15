import Autoplay from "embla-carousel-autoplay"
import { useEffect, useState } from "react"
import { BestAuthorsBanner } from "@/entities/author"
import { HelpBanner } from "@/entities/help"
import { Carousel, type CarouselApi, CarouselContent, CarouselItem } from "@/shared/ui/carousel.tsx"
import { cn } from "@/shared/ui/util.ts"

export const CarouselBanner = () => {
	const [api, setApi] = useState<CarouselApi>()
	const [current, setCurrent] = useState(0)
	const [count, setCount] = useState(0)

	useEffect(() => {
		if (!api) {
			return
		}

		setCount(api.scrollSnapList().length)
		setCurrent(api.selectedScrollSnap())

		api.on("select", () => {
			setCurrent(api.selectedScrollSnap())
		})
	}, [api])

	return (
		<Carousel
			className={"mx-auto w-full"}
			setApi={setApi}
			plugins={[
				Autoplay({
					delay: 5000,
					stopOnMouseEnter: true,
				}),
			]}
		>
			<CarouselContent className={"h-64 md:h-96"}>
				<CarouselItem>
					<div className={"h-full py-1"}>
						<BestAuthorsBanner />
					</div>
				</CarouselItem>
				<CarouselItem>
					<div className={"h-full py-1"}>
						<HelpBanner />
					</div>
				</CarouselItem>
			</CarouselContent>
			<div className={"my-2 flex items-center justify-center gap-4"}>
				{Array.from({ length: count }).map((_, index) => (
					<button
						key={`carousel-indicator-${index}`}
						className={cn(
							"h-2.5 w-12 rounded-full bg-muted-foreground/50 transition-colors hover:bg-muted-foreground/90",
							current === index && "bg-secondary hover:bg-secondary/80"
						)}
						onClick={() => api?.scrollTo(index)}
					/>
				))}
			</div>
		</Carousel>
	)
}
