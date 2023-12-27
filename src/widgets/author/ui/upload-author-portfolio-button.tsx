import { Id } from "@convex/_generated/dataModel"
import { useBoolean } from "usehooks-ts"
import { cn } from "@/shared/ui/util.ts"
import { PlusIcon } from "lucide-react"
import { Button } from "@/shared/ui/button.tsx"
import { UploadDialog } from "@/features/upload-files"
import { useUploadAuthorPortfolio } from "@/widgets/author/model/use-upload-author-portfolio.ts"
import { toast } from "sonner"

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
						categoryId: "j97bxtrcvn2p74gq50s9xcb2q96ffjr4" as Id<"categories">,
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
			<Button onClick={toggle} className={cn("w-full max-w-sm", className)}>
				Upload <PlusIcon className={"ml-2"} />
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
