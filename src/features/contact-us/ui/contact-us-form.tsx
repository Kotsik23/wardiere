import { SendHorizonalIcon } from "lucide-react"
import { Button } from "@/shared/ui/button.tsx"
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/shared/ui/form.tsx"
import { Input } from "@/shared/ui/input.tsx"
import { Textarea } from "@/shared/ui/textarea.tsx"
import { cn } from "@/shared/ui/util.ts"
import { useContactUsForm } from "../model/use-contact-us-form.ts"

type Props = {
	className?: string
}

export const ContactUsForm = ({ className }: Props) => {
	const { handleSubmit, form } = useContactUsForm()

	return (
		<Form {...form}>
			<form
				onSubmit={handleSubmit}
				className={cn(
					"space-y-4 aria-[disabled=true]:pointer-events-none aria-[disabled=true]:opacity-50",
					className
				)}
				aria-disabled={form.formState.isSubmitting}
			>
				<FormField
					name={"name"}
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input placeholder={"Your name..."} {...field} />
							</FormControl>
							<FormDescription>This is your username or full name</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					name={"email"}
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input placeholder={"Your email address..."} {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					name={"message"}
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Message</FormLabel>
							<FormControl>
								<Textarea
									placeholder={"Your message..."}
									minRows={3}
									maxRows={4}
									className={"resize-none"}
									{...field}
								/>
							</FormControl>
							<FormDescription>Describe in more detail</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type={"submit"} className={"w-full md:max-w-52"}>
					Send <SendHorizonalIcon className={"ml-2 size-5"} />
				</Button>
			</form>
		</Form>
	)
}
