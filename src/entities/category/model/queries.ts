import { useQuery } from "convex/react"
import { api } from "@convex/_generated/api"
import { Doc } from "@convex/_generated/dataModel"

export type SelectItem = {
	label: string
	value: string
}

const transformResponse = (response: Doc<"categories">[]): SelectItem[] => {
	return response.map(item => ({
		label: item.name,
		value: item._id,
	}))
}

export const useCategories = () => {
	const categories = useQuery(api.categories.getAll)
	return {
		categories: categories && transformResponse(categories),
	}
}
