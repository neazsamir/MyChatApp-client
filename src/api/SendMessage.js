import { toast } from 'react-hot-toast'

export const sendMessage = async (reciever, text, image) => {
	if (!image && !text.trim()) return
	try {
		const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/message/${reciever}`, {
			headers: {
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify({
				text,
				image
			}),
			credentials: 'include',
		})
		const data = await res.json()
		if (!data?.success) {
			toast.error(data?.msg || "Failed to send message")
		}
		return data?.newMessage || null
	} catch (e) {
		console.log(e)
		toast.error("Failed to send message")
	}
}