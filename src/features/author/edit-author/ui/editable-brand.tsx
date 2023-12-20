import { ChangeEvent, useEffect, useState } from "react"
import { useDebounce, useUpdateEffect } from "usehooks-ts"
import { Doc } from "@convex/_generated/dataModel"
import { Textarea } from "@/shared/ui/textarea.tsx"
import { cn } from "@/shared/ui/util.ts"
import { useEditable } from "../model/use-editable.ts"

type EditableBrandProps = {
	author: Doc<"author">
	className?: string
}

export const EditableBrand = ({ author, className }: EditableBrandProps) => {
	const { handleUpdate } = useEditable()
	const [brandValue, setBrandValue] = useState<string | undefined>(author.brand)
	const debouncedBrandValue = useDebounce(brandValue, 400)

	const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setBrandValue(e.target.value)
	}

	useUpdateEffect(() => {
		handleUpdate({ authorId: author._id, payload: { brand: debouncedBrandValue } })
	}, [debouncedBrandValue])

	useEffect(() => {
		setBrandValue(author.brand)
	}, [author.brand])

	return (
		<Textarea
			placeholder={"Your brand here..."}
			value={brandValue}
			onChange={handleChange}
			className={cn(
				"resize-none text-center text-3xl font-bold italic sm:text-5xl md:text-6xl lg:text-7xl xl:text-9xl",
				className
			)}
		/>
	)
}
