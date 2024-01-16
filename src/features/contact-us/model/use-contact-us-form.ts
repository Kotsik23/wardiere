import { zodResolver } from "@hookform/resolvers/zod"
import { useAction } from "convex/react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { api } from "@convex/_generated/api"
import { unexpectedErrorToast } from "@/shared/ui/toasts"

const formSchema = z.object({
	name: z.string().min(1, "Name is required field"),
	email: z.string().min(1, "Email is required field").email("Incorrect email format"),
	message: z.string().min(1, "Message is required field").max(4096, "Message is too long"),
})

export const useContactUsForm = () => {
	const sendContactUsAction = useAction(api.mailer.sendContactUs)
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			email: "",
			message: "",
		},
	})

	const handleSubmit = async (data: z.infer<typeof formSchema>) => {
		try {
			await sendContactUsAction(data)
			form.reset()
			toast.success(
				"Your message has been sent successfully. We will contact you as soon as possible. Sincerely, the Wardiere team.",
				{ duration: 8000 }
			)
		} catch (error) {
			unexpectedErrorToast()
		}
	}

	return {
		form,
		handleSubmit: form.handleSubmit(handleSubmit),
	}
}
