import { ChangeEvent, useState } from "react"
import { useDebounce, useUpdateEffect } from "usehooks-ts"
import { Doc } from "@convex/_generated/dataModel"
import { Textarea } from "@/shared/ui/textarea.tsx"
import { useEditable } from "../../model/use-editable.ts"

type EditableBrandProps = {
	author: Doc<"author">
}

export const EditableBrand = ({ author }: EditableBrandProps) => {
	const { handleUpdate } = useEditable()
	const [brandValue, setBrandValue] = useState<string | undefined>(author.brand)
	const debouncedBrandValue = useDebounce(brandValue, 400)

	const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setBrandValue(e.target.value)
	}

	useUpdateEffect(() => {
		handleUpdate({ authorId: author._id, payload: { brand: debouncedBrandValue } })
	}, [debouncedBrandValue])

	return (
		<Textarea
			placeholder={"Your brand here..."}
			value={brandValue}
			onChange={handleChange}
			className={
				"my-8 resize-none text-center text-3xl font-bold italic sm:text-5xl md:text-6xl lg:text-7xl xl:text-9xl"
			}
		/>
	)
}
