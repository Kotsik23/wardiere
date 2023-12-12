import { ArrayParam, useQueryParam, withDefault } from "use-query-params"

export const useResetMultipleFilter = ({ key }: { key: string }) => {
	const defaultValue: string[] = []
	const [selected, setSelected] = useQueryParam(key, withDefault(ArrayParam, defaultValue))

	const handleReset = () => {
		setSelected(defaultValue)
	}

	return {
		handleReset,
		hasSelection: selected?.length > 0,
	}
}
