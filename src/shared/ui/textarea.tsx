import * as React from "react"
import TextareaAutosize from "react-textarea-autosize"
import { cn } from "./util.ts"

const Textarea = React.forwardRef<
	React.ElementRef<typeof TextareaAutosize>,
	React.ComponentPropsWithoutRef<typeof TextareaAutosize>
>(({ className, ...props }, ref) => {
	return (
		<TextareaAutosize
			className={cn(
				[
					"flex min-h-[2.5rem] w-full rounded-md border border-input bg-background px-3 py-2 text-sm transition-all",
					"placeholder:text-muted-foreground",
					"ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
					"disabled:cursor-not-allowed disabled:opacity-50",
				],
				className
			)}
			ref={ref}
			spellCheck={false}
			{...props}
		/>
	)
})
Textarea.displayName = "Textarea"

export { Textarea }
