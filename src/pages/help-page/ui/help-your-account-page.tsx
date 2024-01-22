import { ROUTES } from "@/shared/constants/routes.ts"
import { Breadcrumbs } from "@/shared/ui/breadcrumbs.tsx"
import { PageLayout } from "@/shared/ui/layouts"

export const HelpYourAccountPage = () => {
	return (
		<>
			<Breadcrumbs
				className={"container py-6"}
				pages={[
					{ name: "Help", href: ROUTES.HELP },
					{ name: "Your Account", href: ROUTES.HELP_YOUR_ACCOUNT },
				]}
			/>
			<PageLayout className={"container py-8"}>
				<article className={"prose dark:prose-invert max-w-none"}>
					<h2> Your Account on Wardiere</h2>
					<h3>Managing Your Creative Identity</h3>
					<p>
						At Wardiere, your account is your gateway to showcasing and discovering stunning
						photography. We've made managing your account straightforward, allowing you to
						focus on what truly matters - your creativity.
					</p>
					<h3>Account Features</h3>
					<ul>
						<li>
							<b>Portfolio Customization:</b> Easily upload and arrange your photographs.
							Customize your portfolio to reflect your unique style and professional brand.
							Our intuitive interface makes it simple to showcase your best work.
						</li>
						<li>
							<b>Privacy Controls:</b> You have full control over your privacy settings.
							Decide what you share and with whom. Our platform respects your privacy and
							gives you the tools to manage it effectively.
						</li>
						<li>
							<b>Real-Time Notifications:</b> Stay updated with real-time notifications.
							Whether it's about new followers, comments, or collaborations, you'll be in the
							know instantly.
						</li>
						<li>
							<b>User Preferences:</b> Customize your experience on Wardiere. Set your
							preferences for notifications, display settings, and more to make Wardiere
							truly yours.
						</li>
					</ul>
					<h3>Setting Up Your Account</h3>
					<p>
						Setting up your account on Wardiere is a breeze. Simply follow our step-by-step
						guide to create your profile. You can use your email or social media accounts for
						a quick setup.
					</p>
					<h3>Security and Safety</h3>
					<p>
						Your account's security is our top priority. We employ advanced security measures
						to protect your personal information and portfolio. Regular updates and monitoring
						ensure that your data is always secure.
					</p>
					<h3>Troubleshooting and Support</h3>
					<p>
						Having trouble with your account? Our support team is here to help. Whether it's a
						login issue, a technical glitch, or just a question about account settings, we're
						just an email or a message away.
					</p>
					<h3>Stay Connected and Updated</h3>
					<p>
						Keep your account details up-to-date to stay connected with the Wardiere
						community. Regularly update your profile, contact information, and portfolio to
						make the most of your Wardiere experience.
					</p>
					<h3>Deleting Your Account</h3>
					<p>
						We understand that circumstances change. If you decide to delete your account, you
						can do so in your account settings. Please note that this action is irreversible
						and will result in the loss of all your data and portfolio on Wardiere.
					</p>
				</article>
			</PageLayout>
		</>
	)
}
