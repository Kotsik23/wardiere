import { useQuery } from "convex/react"
import { api } from "@convex/_generated/api"

export const useGetHero = ({ take }: { take?: number }) => {
	const portfolios = useQuery(api.portfolios.getHero, { take })
	return { portfolios }
}
