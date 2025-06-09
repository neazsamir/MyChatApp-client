import { toast } from 'react-hot-toast'

export const logout = async () => {
	try {
		const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/auth/logout`, {
		method: "POST",
		credentials: 'include'
		})
		const data = await res.json()
		return data
	} catch (e) {
		console.log(e)
		toast.error("Failed to logout")
	}
}