"use node"

import { CourierClient } from "@trycourier/courier"
import { action } from "./_generated/server"
import { v } from "convex/values"

const courier = new CourierClient({ authorizationToken: process.env.COURIER_AUTH_KEY })
const SUPPORT_EMAIL = "tashcher228@yandex.ru"

export const sendContactUs = action({
	args: {
		name: v.string(),
		email: v.string(),
		message: v.string(),
	},
	handler: async (_, args) => {
		return await courier.send({
			message: {
				to: {
					email: SUPPORT_EMAIL,
					data: {
						name: args.name,
						email: args.email,
						message: args.message,
					},
				},
				content: {
					title: "Wardiere Support Message",
					body: "Name: {name}\n" + "Email: {email}\n" + "Message: {message}",
				},
			},
		})
	},
})
