import { UserProfile } from "@clerk/clerk-react"
import { PageLayout } from "@/shared/ui/layouts"

export const SettingsPage = () => {
	return (
		<PageLayout className={"container grid place-items-center overflow-hidden"}>
			<UserProfile
				appearance={{
					elements: {
						rootBox: "max-w-4xl w-full",
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
