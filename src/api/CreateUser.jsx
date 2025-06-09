import { toast } from 'react-hot-toast'
import { registerSchema } from '../validators/register.validateor.js'

export const createUser = async (body, navigate) => {
	try {
	const userData = await registerSchema.parseAsync(body)
		const res = await fetch(`https://mychatapp-server-1.onrender.com/api/auth/register`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(userData),
			credentials: 'include'
		})
		const data = await res.json()
		if (data?.success) {
			toast.success(data.msg)
			return true
		} else {
			toast.error(data?.msg)
			return false
		}
	} catch (err) {
		toast.error(err?.issues?.[0]?.message || err?.message[0] || "Something went wrong")
	}
}