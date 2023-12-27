"use node"

import { internalAction } from "./_generated/server"
import { v } from "convex/values"
import { Webhook } from "svix"

const whSecret = process.env.CLERK_WEBHOOK_SECRET

export const clerkWebhook = internalAction({
	args: {
		payload: v.string(),
		headers: v.object({
			svixId: v.string(),
			svixTimestamp: v.string(),
			svixSignature: v.string(),
		}),
	},
	handler: async (_, args) => {
		if (!whSecret) {
			throw Error("Webhook secret is missing")
		}

		const wh = new Webhook(whSecret)
		let payload
		try {
			payload = wh.verify(args.payload, {
				"svix-id": args.headers.svixId,
				"svix-timestamp": args.headers.svixTimestamp,
				"svix-signature": args.headers.svixSignature,
			})
		} catch (error) {
			throw Error("Error occurred while validating webhook")
		}
		return payload
	},
})
