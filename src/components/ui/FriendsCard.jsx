import {getLastMessage} from '../../api/GetLastMessage.js'
import { useState, useEffect } from 'react'
import { useAppContext } from '../../store/AppContext'
import { useAuthContext } from '../../store/AuthContext'
import { timeAgo } from '../../utils/timeAgo.js'
import { useNavigate } from 'react-router-dom'
import { Avatar } from './Avatar'

export const FriendsCard = ({friend, setSearchResLoading}) => {
	const { fullName, avatar, _id: id } = friend
	const { user } = useAuthContext()
	const [lastMessage, setLastMessage] = useState({})
	const navigate = useNavigate()
	useEffect(() => {
		const fetchLastMessage = async () => {
			setSearchResLoading(true)
			try {

				const data = await getLastMessage(id)
				setLastMessage(data || {})
			} catch (e) {
				console.log(e)
			} finally {
				setSearchResLoading(false)
			}
		}
		if (!Object.keys(lastMessage).length) fetchLastMessage()
	}, [])
	
const lastSeen = new Date(friend.lastSeen).getTime()
const now = new Date().getTime()
const diffMs = now - lastSeen;
const diffMinutes = diffMs / (1000 * 60);
const active = diffMinutes <= 3;
	
	
	
  return (
    <div onClick={() => navigate(`/chat/${id}`)} className="w-full flex items-center">
			<Avatar avatar={avatar} active={active} />
				<div className="ms-4">
					<h4 className={lastMessage?.seen && lastMessage?.senderId === user.id  ? "" : "font-bold"}>{fullName}</h4>
							{(lastMessage?.text || lastMessage?.image) && (
  <p className={`text-sm ${lastMessage?.seen ? "" : "font-bold"}`}>
    {lastMessage?.senderId === user.id && "You: "}
    {lastMessage?.text
      ? lastMessage.text.slice(0, 24) + (lastMessage.text.length > 16 ? "..." : "")
      : "Image"}
  </p>
)}
				</div>
    </div>
  )
}