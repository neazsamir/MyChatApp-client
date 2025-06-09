export const searchFriend = async (query) => {
	try {
		const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/message/searchFriend/?query=${query}`, {
			credentials: 'include'
		})
		const data = await res.json()
		return data.matchedFriends
	} catch (e) {
		console.log(e)
	}
}