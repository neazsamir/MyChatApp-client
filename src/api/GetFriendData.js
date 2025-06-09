import { toast } from 'react-hot-toast'

export const getFriendData = async (id) => {
	try {
		const res = await fetch(`https://mychatapp-server-1.onrender.com/api/message/friendData/${id}`, {credentials: "include"})
		const data = await res.json()
		if (data.success) {
			return data?.friendData
		} else {
			return null
		}
	} catch (e) {
		console.log(e)
		toast.error("Something went wrong")
	}
}