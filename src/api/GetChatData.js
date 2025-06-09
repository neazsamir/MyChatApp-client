export const getChatData = async (id) => {
	try {
		const res = await fetch(`https://mychatapp-server-1.onrender.com/api/message/${id}`, { credentials: 'include' })
		const data = await res.json()
		return data.messages
	} catch (e) {
		console.log(e)
	}
}