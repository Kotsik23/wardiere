export type FilterItemType = {
	label: string
	value: string
}

export type FilterProps = {
	name: string
	title: string
	items: FilterItemType[]
}
