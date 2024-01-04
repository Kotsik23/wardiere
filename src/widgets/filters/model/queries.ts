import { useQuery } from "convex/react"
import { api } from "@convex/_generated/api"
import { Doc } from "@convex/_generated/dataModel"
import { FilterItemType } from "@/features/filters"

const transformResponse = (response: Doc<"categories">[]): FilterItemType[] => {
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
