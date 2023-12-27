import { UserProfile } from "@clerk/clerk-react"
import { BackButton } from "@/shared/ui/back-button.tsx"
import { PageLayout } from "@/shared/ui/layouts"
import { ROUTES } from "@/shared/constants/routes.ts"

export const SettingsPage = () => {
	return (
		<PageLayout
			className={
				"container flex  max-w-4xl flex-col items-center justify-center gap-6 overflow-hidden"
			}
		>
			<BackButton className={"self-start"} />
			<UserProfile
				path={ROUTES.SETTINGS}
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
