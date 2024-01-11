import { useLocation, useNavigate } from "react-router-dom"

export const useResetFilter = () => {
	const navigate = useNavigate()
	const { pathname, search } = useLocation()

	const handleReset = () => {
		const withoutSearchParams = pathname.replace(search, "")
		navigate(withoutSearchParams)
	}

	return { handleReset, disabled: search.trim() === "" }
}
