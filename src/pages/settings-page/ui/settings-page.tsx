import { UserProfile } from "@clerk/clerk-react"
import { ROUTES } from "@/shared/constants/routes.ts"
import { Breadcrumbs } from "@/shared/ui/breadcrumbs.tsx"
import { PageLayout } from "@/shared/ui/layouts"

export const SettingsPage = () => {
	return (
		<>
			<Breadcrumbs
				className={"container mt-6 max-w-4xl px-6 md:px-8"}
				pages={[{ name: "Settings", href: ROUTES.SETTINGS, currentPage: true }]}
			/>
			<PageLayout
				className={
					"container my-8 flex max-w-4xl flex-col items-center justify-center gap-6 overflow-hidden"
				}
			>
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
		</>
	)
}
