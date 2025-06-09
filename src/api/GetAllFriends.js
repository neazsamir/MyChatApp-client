const getAllFriends = async () => {
	try {
		const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/message/friends`, {
			credentials: 'include'
		})
		const data = await res.json()
		return data.friends
	} catch (e) {
		console.log(e)
	} finally {
	}
}

export default getAllFriends