import { ROUTES } from "@/shared/constants/routes.ts"
import { Breadcrumbs } from "@/shared/ui/breadcrumbs.tsx"
import { PageLayout } from "@/shared/ui/layouts"

export const HelpSecurityPage = () => {
	return (
		<>
			<Breadcrumbs
				className={"container py-6"}
				pages={[
					{ name: "Help", href: ROUTES.HELP },
					{ name: "Security", href: ROUTES.HELP_SECURITY },
				]}
			/>
			<PageLayout className={"container py-8"}>
				<article className={"prose dark:prose-invert max-w-none"}>
					<h2>Security at Wardiere</h2>
					<h3>Our Commitment to Your Safety</h3>
					<p>
						At Wardiere, we understand that the security of your data and personal information
						is paramount. That's why we've built our platform with cutting-edge technologies
						and a focus on robust security measures.
					</p>
					<h3>Powered by Leading Technologies</h3>
					<ul>
						<li>
							<b>Clerk</b>: We leverage Clerk for secure user authentication and management.
							This ensures that your login experience is not only user-friendly but also
							protected with industry-leading security standards. Clerk's technology helps in
							safeguarding your personal data and portfolio with advanced encryption and
							security protocols.
						</li>
						<li>
							<b>Convex:</b> Our backend is powered by Convex, which provides us with the
							capability to handle real-time data efficiently and securely. Convex's
							architecture is designed to ensure that your data is not only fast to access
							but also stored and managed with the utmost security. We use Convex to maintain
							the integrity and confidentiality of your photographs and personal information.
						</li>
						<li>
							<b>React:</b> The front-end of Wardiere is developed using React, a powerful
							JavaScript library for building user interfaces. React helps us in creating a
							seamless and responsive experience for our users. It also plays a significant
							role in maintaining site security by helping to prevent common vulnerabilities
							like Cross-Site Scripting (XSS).
						</li>
					</ul>
					<h3>Continuous Security Monitoring</h3>
					<p>
						We continuously monitor our systems for any unusual activity and are always
						updating our practices to deal with emerging security threats. Our team is
						dedicated to ensuring that Wardiere remains a safe and reliable platform for
						photographers and photography enthusiasts alike.
					</p>
					<h3>Your Role in Security</h3>
					<p>
						While we do our best to secure your data, security is a shared responsibility. We
						encourage our users to practice safe browsing habits, use strong and unique
						passwords, and be cautious of phishing scams.
					</p>
					<h3>Have Questions or Concerns?</h3>
					<p>
						Your peace of mind is our top priority. If you have any questions about our
						security measures or if you have security concerns, please do not hesitate to
						contact us. We are here to help ensure that your experience on Wardiere is not
						only creatively fulfilling but also safe and secure.
					</p>
				</article>
			</PageLayout>
		</>
	)
}
