import { ReactNode } from "react"
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "../../alert-dialog.tsx"

type ConfirmationDialogProps = {
	open: boolean
	onOpenChange: (open: boolean) => void
	onConfirm: () => void
	title: string | ReactNode
	description?: string | ReactNode
	isPending?: boolean
}

export const ConfirmationDialog = ({
	open,
	onOpenChange,
	onConfirm,
	title,
	description,
	isPending = false,
}: ConfirmationDialogProps) => {
	return (
		<AlertDialog open={open} onOpenChange={onOpenChange}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle className={"text-2xl"}>{title}</AlertDialogTitle>
					<AlertDialogDescription className={"text-base"}>
						{description}
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction onClick={onConfirm} disabled={isPending}>
						Confirm
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
