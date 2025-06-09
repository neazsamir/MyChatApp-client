const getAllFriends = async () => {
	try {
		const res = await fetch(`https://mychatapp-server-1.onrender.com/api/message/friends`, {
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