import { PlusIcon } from "lucide-react"
import { toast } from "sonner"
import { useBoolean } from "usehooks-ts"
import { Id } from "@convex/_generated/dataModel"
import { UploadDialog } from "@/features/upload-files"
import { Button } from "@/shared/ui/button.tsx"
import { cn } from "@/shared/ui/util.ts"
import { useUploadAuthorPortfolio } from "../model/use-upload-author-portfolio.ts"

type Props = {
	authorId: Id<"authors">
	className?: string
}

export const UploadAuthorPortfolioButton = ({ authorId, className }: Props) => {
	const { value: open, setValue: onOpenChange, toggle } = useBoolean()
	const { handleUploadPortfolio } = useUploadAuthorPortfolio()

	const handleUpload = async ({ buffers }: { buffers: ArrayBuffer[] }) => {
		try {
			await Promise.all(
				buffers.map(buffer =>
					handleUploadPortfolio({
						authorId,
						categoryId: "j9792qgqc6zm47cr4b0nfkrrkd6gw55w" as Id<"categories">,
						arrayBuffer: buffer,
					})
				)
			)
			toast.success("Successfully uploaded")
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<>
			<Button onClick={toggle} className={cn("w-80", className)}>
				Upload Portfolio <PlusIcon className={"ml-2"} />
			</Button>
			<UploadDialog
				multiple={true}
				open={open}
				onOpenChange={onOpenChange}
				onUpload={handleUpload}
			/>
		</>
	)
}
