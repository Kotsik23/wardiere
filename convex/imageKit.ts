"use node"

import ImageKit from "imagekit"
import { v4 as uuidv4 } from "uuid"
import { ConvexError, v } from "convex/values"
import { internalAction } from "./_generated/server"

const publicKey = process.env.IMAGEKIT_PUBLIC_KEY
const privateKey = process.env.IMAGEKIT_PRIVATE_KEY
const urlEndpoint = process.env.IMAGEKIT_URL_ENDPOINT

if (!publicKey) {
	throw new ConvexError("ImageKit public key is missing. Check env file")
}
if (!privateKey) {
	throw new ConvexError("ImageKit private key is missing. Check env file")
}
if (!urlEndpoint) {
	throw new ConvexError("ImageKit url endpoint is missing. Check env file")
}

const imagekit = new ImageKit({
	publicKey,
	privateKey,
	urlEndpoint,
})

export const upload = internalAction({
	args: {
		arrayBuffer: v.bytes(),
	},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity()
		const userId = identity?.subject
		const buffer = Buffer.from(args.arrayBuffer)

		return imagekit.upload({
			file: buffer,
			fileName: uuidv4(),
			folder: userId,
		})
	},
})

export const remove = internalAction({
	args: {
		fileId: v.string(),
	},
	handler: async (_, args) => {
		return imagekit.deleteFile(args.fileId)
	},
})
