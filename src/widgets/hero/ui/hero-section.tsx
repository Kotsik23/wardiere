import { useUser } from "@clerk/clerk-react"
import { useAuthorButton } from "@/features/author/navigate-author"
import { Button } from "@/shared/ui/button.tsx"

export const HeroSection = () => {
	const { user } = useUser()
	const { handleClick } = useAuthorButton()

	return (
		<section className={"flex min-h-screen flex-col items-center justify-center"}>
			<h1
				className={
					"glowing-text text-center text-5xl font-bold md:text-6xl lg:text-7xl xl:text-8xl"
				}
			>
				WARDIERE
			</h1>
			<p className={"mt-6 text-center text-xl font-medium lg:text-2xl"}>
				Connect with{" "}
				<span
					className={
						"bg-gradient-to-br from-secondary to-violet-500 bg-clip-text font-semibold text-transparent dark:to-violet-400"
					}
				>
					Professional Photographers
				</span>
			</p>
			<p className={"mt-4 max-w-xl text-center italic"}>
				"Explore Wardiere: Your hub for professional photographers and striking portfolios.
				Connect, discover, and showcase your photography with ease."
			</p>
			<Button
				className={"mt-6 rounded-full text-lg font-semibold"}
				size={"lg"}
				variant={"outline"}
				onClick={() => handleClick({ userId: user?.id })}
			>
				<span className={"primary-gradient-text drop-shadow-md"}>Get Started</span>
			</Button>
		</section>
	)
}
