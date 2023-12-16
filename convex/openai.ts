"use node"

import OpenAI from "openai"
import { action } from "./_generated/server"
import { ConvexError } from "convex/values"

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
})

export const aboutTextCompletion = action({
	args: {},
	handler: async ctx => {
		const identity = await ctx.auth.getUserIdentity()
		if (!identity) {
			throw new ConvexError("Unauthenticated")
		}
		const completion = await openai.chat.completions.create({
			model: "gpt-3.5-turbo",
			messages: [
				{
					role: "system",
					content: "Give answers in JSON format",
				},
				{
					role: "user",
					content:
						"You're a photographer. Write the text 'about yourself' in some sentence. " +
						"Mention your virtues, the jobs you've done, and the like. " +
						"Your answer must be unique, not repeated, and pass the anti-plagiarism test." +
						"Name of the response field: aboutText",
				},
			],
		})
		const response = completion.choices[0].message.content
		if (response) {
			return JSON.parse(response) as { aboutText: string }
		} else {
			throw new ConvexError("Something went wrong. Try again.")
		}
	},
})
