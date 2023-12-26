import { ArrowLeftIcon } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Button } from "./button.tsx"
import { cn } from "./util.ts"

type Props = {
	className?: string
	backDepth?: number
}

export const BackButton = ({ className, backDepth = 1 }: Props) => {
	const navigate = useNavigate()

	const handleBack = () => {
		navigate(-backDepth)
	}

	return (
		<Button variant={"outline"} onClick={handleBack} className={cn(className)}>
			<ArrowLeftIcon className={"mr-2 h-5 w-5"} />
			Go Back
		</Button>
	)
}
