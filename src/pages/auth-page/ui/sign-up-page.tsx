import { SignUp } from "@clerk/clerk-react"
import { useLocation } from "react-router-dom"
import { ROUTES } from "@/shared/constants/routes.ts"
import { PageLayout } from "@/shared/ui/layouts"

export const SignUpPage = () => {
	const { state } = useLocation()
	const from = state?.from?.pathname

	return (
		<PageLayout className={"grid place-items-center md:mt-40"}>
			<SignUp
				path={ROUTES.SIGN_UP}
				signInUrl={ROUTES.SIGN_IN}
				redirectUrl={from || ROUTES.EXPLORE}
				appearance={{
					elements: {
						card: "[&>div:nth-child(4)]:hidden shadow-md dark:shadow-none animate-in zoom-in-75 transition-transform duration-500",
					},
				}}
			/>
		</PageLayout>
	)
}
