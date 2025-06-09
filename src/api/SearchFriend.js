export const searchFriend = async (query) => {
	try {
		const res = await fetch(`https://mychatapp-server-1.onrender.com/api/message/searchFriend/?query=${query}`, {
			credentials: 'include'
		})
		const data = await res.json()
		return data.matchedFriends
	} catch (e) {
		console.log(e)
	}
}