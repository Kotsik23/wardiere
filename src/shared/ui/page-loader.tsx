import { Spinner } from "./spinner.tsx"

export const PageLoader = () => {
	return (
		<div
			className={
				"grid h-screen place-items-center duration-500 animate-in fade-in-80 zoom-in-75"
			}
		>
			<div className={"flex flex-col items-center gap-4"}>
				<Spinner className={"h-12 w-12"} />
				<p className={"text-base font-light tracking-wide text-muted-foreground"}>
					Loading page...
				</p>
			</div>
		</div>
	)
}
