import { useQuery } from "convex/react"
import { api } from "@convex/_generated/api"
import { Doc, Id } from "@convex/_generated/dataModel"
import { SelectType } from "@/shared/ui/select.tsx"

export type CategorySelectItem = {
	has?: boolean
} & SelectType

const transformResponse = (response: (Doc<"categories"> & { has?: boolean })[]): SelectItem[] => {
	return response.map(item => ({
		label: item.name,
		value: item._id,
		has: item.has || false,
	}))
}

export const useCategories = ({ authorId }: { authorId?: Id<"authors"> }) => {
	const categories = useQuery(api.categories.getAll, { authorId })
	return {
		categories: categories && transformResponse(categories),
	}
}
