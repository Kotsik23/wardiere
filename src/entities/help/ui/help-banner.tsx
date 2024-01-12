import { ROUTES } from "@/shared/constants/routes.ts"
import { Card } from "@/shared/ui/card.tsx"
import { NavigationLink } from "@/shared/ui/links"
import { ProgressiveImage } from "@/shared/ui/progressive-image.tsx"

const url = "https://ik.imagekit.io/k3z5s13bx/wardiere-support/composition-9.png"

export const HelpBanner = () => {
	return (
		<Card
			className={
				"relative flex h-full items-center justify-center overflow-hidden md:justify-start"
			}
		>
			<ProgressiveImage
				alt={"support-banner"}
				src={url + "?tr=fo-auto"}
				placeholder={url + "?tr=fo-auto,w-0.05,h-0.05,q-1"}
				className={"absolute inset-0 h-full w-full object-cover"}
			/>
			<div
				className={
					"relative m-2 flex max-w-md flex-col gap-2 rounded-md bg-background/95 p-2 lg:m-12 lg:p-4"
				}
			>
				<h2 className={"mb-2 text-xl font-bold md:text-2xl lg:mb-4 lg:text-4xl"}>
					Always Here to Help!
				</h2>
				<p className={"text-sm font-medium md:text-base"}>
					Experiencing Issues? Reach Out to Our 24/7 Website Support Team. Efficient. Friendly.
					Problem Solvers.
				</p>
				<span className={"text-sm font-medium md:text-base"}>
					<NavigationLink
						to={ROUTES.HELP}
						className={
							"text-sm font-semibold text-secondary hover:text-secondary/70 md:text-base"
						}
					>
						Click Here
					</NavigationLink>{" "}
					for Immediate Assistance.
				</span>
			</div>
		</Card>
	)
}
