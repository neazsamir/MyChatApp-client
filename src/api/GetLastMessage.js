export const getLastMessage = async (friendId) => {
	try {
		const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/message/lastMessage/${friendId}`, {
			headers: {
				"Content-Type": "application/json"
			},
			credentials: 'include'
		})
		const data = await res.json()
		return data.lastMessage
	} catch(e) {
		console.log(e)
	}
}