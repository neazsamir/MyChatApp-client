export const getChatData = async (id) => {
	try {
		const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/message/${id}`, { credentials: 'include' })
		const data = await res.json()
		return data.messages
	} catch (e) {
		console.log(e)
	}
}