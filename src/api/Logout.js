import { toast } from 'react-hot-toast'

export const logout = async () => {
	try {
		const res = await fetch(`https://mychatapp-server-1.onrender.com/api/auth/logout`, {
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