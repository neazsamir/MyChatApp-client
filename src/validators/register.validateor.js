import { z } from 'zod'
import sanitizeHtml from 'sanitize-html'

const sanitize = (value) =>
	typeof value === 'string'
		? sanitizeHtml(value, { allowedTags: [], allowedAttributes: {} }).trim()
		: value

export const registerSchema = z.object({
	fullName: z.preprocess(sanitize,
		z.string({ required_error: "Name is required." })
			.min(3, { message: "Name must be at least 3 characters." })
			.max(12, { message: "Name must be at most 12 characters." })
	),

	email: z.preprocess(sanitize,
		z.string({ required_error: "Email is required." })
			.email({ message: "Invalid email address." })
			.max(40, { message: "Email must be at most 40 characters." })
	),

	password: z.preprocess(sanitize,
		z.string({ required_error: "Password is required." })
			.min(8, { message: "Password must be at least 8 characters." })
			.max(56, { message: "Password must be at most 56 characters." })
	)
})