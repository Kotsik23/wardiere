import { useLocation } from "react-router-dom"
import { useUpdateEffect } from "usehooks-ts"

export const ScrollTop = () => {
	const { pathname } = useLocation()

	useUpdateEffect(() => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: "smooth",
		})
	}, [pathname])

	return null
}
