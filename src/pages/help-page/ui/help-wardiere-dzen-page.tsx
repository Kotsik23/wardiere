import { ROUTES } from "@/shared/constants/routes.ts"
import { Breadcrumbs } from "@/shared/ui/breadcrumbs.tsx"
import { PageLayout } from "@/shared/ui/layouts"

export const HelpWardiereDzenPage = () => {
	return (
		<>
			<Breadcrumbs
				className={"container py-6"}
				pages={[
					{ name: "Help", href: ROUTES.HELP },
					{ name: "Wardiere Dzen", href: ROUTES.HELP_WARDIERE_DZEN },
				]}
			/>
			<PageLayout className={"container py-8"}>
				<article className={"prose dark:prose-invert max-w-none"}>
					<h2>Discover the Essence of Photography with Wardiere Dzen</h2>
					<h3>Embrace the Artistic Journey</h3>
					<p>
						Wardiere Dzen is our dedicated space where creativity, calmness, and inspiration
						converge. It's designed for photographers and enthusiasts who seek a deeper
						connection with the art of photography.
					</p>
					<h3>What is Wardiere Dzen?</h3>
					<p>
						Wardiere Dzen is more than just a feature; it's a philosophy. It embraces the
						tranquility and mindfulness that comes with the artistic process of photography.
						Here, you can explore collections, stories, and insights that transcend the
						ordinary, encouraging a zen-like focus on the beauty and craft of photography.
					</p>
					<h3>Features of Wardiere Dzen</h3>
					<ul>
						<li>
							<b>Curated Collections:</b> Dive into handpicked collections that showcase the
							finest works in various genres of photography. Each collection is thoughtfully
							curated to evoke emotion and appreciation for the art.
						</li>
						<li>
							<b>Photographic Journeys:</b> Follow the journeys of renowned photographers as
							they share their experiences, challenges, and triumphs. Gain valuable insights
							into their creative processes and what drives their passion.
						</li>
						<li>
							<b>Mindful Practices:</b> Engage with content focused on the mindful aspects of
							photography. Learn how to bring a sense of calm and presence into your
							photography practice, enhancing both your art and your well-being.
						</li>
						<li>
							<b>Interactive Sessions:</b> Participate in guided sessions that focus on the
							contemplative side of photography. These sessions are designed to refine your
							skills while nurturing a deeper connection with your craft.
						</li>
					</ul>
					<h3>Engaging with the Community</h3>
					<p>
						Wardiere Dzen is also a platform for connection and discussion. Share your
						experiences, ask questions, and engage with a community that values the serene and
						thoughtful side of photography.
					</p>
					<h3>Accessing Wardiere Dzen</h3>
					<p>
						Available to all members of Wardiere, this feature can be accessed directly from
						your dashboard. Dive in and discover a world where photography and mindfulness
						meet.
					</p>
					<h3>Feedback and Suggestions</h3>
					<p>
						Your experience with Wardiere Dzen matters to us. We welcome feedback and
						suggestions on how we can improve this feature to better serve your artistic
						journey and well-being.
					</p>
				</article>
			</PageLayout>
		</>
	)
}
