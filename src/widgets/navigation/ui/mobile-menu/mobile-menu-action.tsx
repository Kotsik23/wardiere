import { LucideIcon } from "lucide-react"
import { Button } from "@/shared/ui/button.tsx"
import { cn } from "@/shared/ui/util.ts"

type MobileMenuActionProps = {
	label: string
	icon: LucideIcon
	onClick: () => void
	className?: string
}

export const MobileMenuAction = ({
	label,
	icon: Icon,
	onClick,
	className,
}: MobileMenuActionProps) => {
	return (
		<Button
			variant={"link"}
			className={cn(
				"h-fit justify-start gap-2 p-0 text-base font-medium transition-colors hover:text-foreground/70 hover:no-underline",
				className
			)}
			onClick={onClick}
		>
			<Icon className={"h-5 w-5"} />
			{label}
		</Button>
	)
}
