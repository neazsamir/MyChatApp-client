export const getLastMessage = async (friendId) => {
	try {
		const res = await fetch(`https://mychatapp-server-1.onrender.com/api/message/lastMessage/${friendId}`, {
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