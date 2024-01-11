import { UserProfile } from "@clerk/clerk-react"
import { GlobeIcon, HomeIcon } from "lucide-react"
import { Link } from "react-router-dom"
import { ROUTES } from "@/shared/constants/routes.ts"
import { Button } from "@/shared/ui/button.tsx"
import { PageLayout } from "@/shared/ui/layouts"

export const SettingsPage = () => {
	return (
		<PageLayout
			className={
				"container my-8 flex max-w-4xl flex-col items-center justify-center gap-6 overflow-hidden"
			}
		>
			<div className={"flex items-center gap-4 self-start"}>
				<Button asChild variant={"outline"}>
					<Link to={ROUTES.EXPLORE}>
						<GlobeIcon className={"mr-2 size-5"} />
						Explore
					</Link>
				</Button>
				<Button asChild variant={"outline"}>
					<Link to={ROUTES.HOME}>
						<HomeIcon className={"mr-2 size-5"} />
						Go Home
					</Link>
				</Button>
			</div>
			<UserProfile
				appearance={{
					elements: {
						rootBox: "w-full",
						card: "border-0 p-0 m-0 shadow-none w-auto max-w-full rounded-none [&>div:nth-child(3)]:hidden",
						navbar: "hidden",
						navbarMobileMenuButton: "hidden",
						scrollBox: "rounded-none",
						page: "gap-0",
						pageScrollBox: "p-2 md:p-4",
						accordionTriggerButton: "max-md:px-2",
						profileSectionPrimaryButton: "max-md:px-2",
						profileSectionContent__username: "[&>p]:max-md:px-2",
						profileSectionContent__danger:
							"[&>div]:flex-col [&>div]:max-md:mx-0 [&>div]:gap-4",
					},
				}}
			/>
		</PageLayout>
	)
}
