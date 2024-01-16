import { HelpCircleIcon } from "lucide-react"
import { ContactUsForm } from "@/features/contact-us"
import { Card } from "@/shared/ui/card.tsx"
import { GlowingBubbles } from "@/shared/ui/glowing-bubbles.tsx"

export const ContactUsSection = () => {
	return (
		<div className={"relative flex w-full max-w-5xl items-center justify-center"}>
			<Card
				className={
					"flex flex-col items-start p-4 backdrop-blur-md supports-[backdrop-filter]:bg-background/50"
				}
			>
				<div className={"flex items-center gap-2 md:gap-4"}>
					<h2 className={"glowing-text text-2xl font-bold md:text-3xl lg:text-4xl"}>
						Contact Us
					</h2>
					<HelpCircleIcon className={"size-6 text-secondary md:size-8"} />
				</div>
				<p
					className={
						"mt-2 max-w-xl text-balance text-base font-medium text-muted-foreground md:text-lg"
					}
				>
					It's very important for us to keep in touch with you, so we are always ready to
					answer the question that interests you!
				</p>
				<ContactUsForm className={"mt-8 w-full max-w-xl"} />
			</Card>
			<GlowingBubbles />
		</div>
	)
}
