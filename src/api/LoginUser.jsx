import { toast } from 'react-hot-toast'



export const loginUser = async (credentials, navigate) => {
	if (!credentials?.email?.trim() || !credentials?.password?.trim()) return toast.error("Please fill the required fields.")
	try {
		const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/auth/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(credentials),
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
		console.log(err)
		toast.error(err?.msg || "Something went wrong")
	}
}