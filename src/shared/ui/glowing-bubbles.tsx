import { cn } from "./util.ts"

export const GlowingBubbles = () => {
	const blobClassName =
		"animate-blob absolute -z-50 size-40 rounded-full mix-blend-multiply blur-xl filter sm:size-56 lg:size-72 dark:mix-blend-normal opacity-90 dark:opacity-80"

	return (
		<>
			<div className={cn(blobClassName, "left-4 top-8 bg-violet-300")} />
			<div className={cn(blobClassName, "animation-delay-2000 right-4 top-12 bg-fuchsia-300")} />
			<div className={cn(blobClassName, "animation-delay-4000 bottom-8 left-20 bg-rose-300")} />
			<div className={cn(blobClassName, "bottom-20 right-32 bg-blue-300")} />
		</>
	)
}
