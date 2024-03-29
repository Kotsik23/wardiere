"use node"

import OpenAI from "openai"
import { action, internalAction } from "./_generated/server"
import { ConvexError, v } from "convex/values"

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
			model: "gpt-3.5-turbo-1106",
			response_format: { type: "json_object" },
			messages: [
				{ role: "system", content: "You are a helpful assistant designed to output JSON." },
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

export const brandCompletion = action({
	args: {
		username: v.string(),
	},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity()
		if (!identity) {
			throw new ConvexError("Unauthenticated")
		}
		const completion = await openai.chat.completions.create({
			model: "gpt-3.5-turbo-1106",
			response_format: { type: "json_object" },
			messages: [
				{ role: "system", content: "You are a helpful assistant designed to output JSON." },
				{
					role: "user",
					content:
						`Generate possible nicknames (5-7) for the photographer based on this nickname: ${args.username}` +
						"It must consist of two or more words separated by spaces and contain provided nickname or it's part." +
						"Name of the response field (string[]): brands",
				},
			],
		})
		const response = completion.choices[0].message.content
		if (response) {
			return JSON.parse(response) as { brands: string[] }
		} else {
			throw new ConvexError("Something went wrong. Try again.")
		}
	},
})

export const embed = internalAction({
	args: {
		text: v.union(v.string(), v.array(v.string())),
	},
	handler: async (_, args): Promise<number[]> => {
		const embeddings = await openai.embeddings.create({
			model: "text-embedding-ada-002",
			input: args.text,
		})
		return embeddings.data[0].embedding
	},
})
