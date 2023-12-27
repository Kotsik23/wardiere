export interface ClerkWebhook<T> {
	data: T
	object: string
	type: string
}

export interface ClerkUser {
	created_at: number
	email_addresses: EmailAddress[]
	first_name: string
	id: string
	image_url: string
	last_name: string
	updated_at: number
	username: any
}

export interface EmailAddress {
	email_address: string
	id: string
}
