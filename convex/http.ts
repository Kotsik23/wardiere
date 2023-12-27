import { httpRouter } from "convex/server"
import { handleClerkWebhook } from "./clerk"

const http = httpRouter()

http.route({
	path: "/clerk-user-webhook",
	method: "POST",
	handler: handleClerkWebhook,
})

export default http
