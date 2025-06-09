import { useEffect, useState, useRef } from 'react'
import { useAppContext } from '../store/AppContext'
import { useAuthContext } from '../store/AuthContext'
import { LeftSideBar } from '../components/ui/LeftSideBar'
import { getFriendData } from '../api/GetFriendData.js'
import { useParams } from 'react-router-dom'
import { Avatar } from '../components/ui/Avatar'
import { IoSend } from "react-icons/io5"
import { getChatData } from '../api/GetChatData.js'
import { sendMessage } from '../api/SendMessage.js'
import { io } from 'socket.io-client'

const socket = io("https://mychatapp-server-1.onrender.com/")

export const Chat = () => {
	const [friend, setFriend] = useState(null)
	const [chatData, setChatData] = useState([])
	const { user } = useAuthContext()
	const { loading, setLoading } = useAppContext()
	const [messageText, setMessageText] = useState('')
	const bottomRef = useRef(null)
	const params = useParams()

	useEffect(() => {
		const fetchFriendData = async () => {
			try {
				const data = await getFriendData(params.id)
				setFriend(data)
			} catch (e) {}
		}
		const fetchChatData = async () => {
			try {
				const data = await getChatData(params.id)
				setChatData(data)
			} catch (e) {}
		}
		if (!user) return
		fetchFriendData()
		fetchChatData()
		socket.emit("register", user._id)
	}, [user, params.id])

	// Realtime listener
	useEffect(() => {
		if (!user || !friend) return

		const handleIncomingMessage = (data) => {
			console.log("📥 Message received:", data)
			setChatData((prev) => [...prev, {
				text: data.text,
				senderId: data.sender,
				_id: Date.now(), // temporary id
			}])
		}

		socket.on("chat", handleIncomingMessage)

		return () => {
			socket.off("chat", handleIncomingMessage)
		}
	}, [user, friend])

	useEffect(() => {
		bottomRef.current?.scrollIntoView({})
	}, [chatData])

	const lastSeen = new Date(friend?.lastSeen)?.getTime()
	const now = new Date().getTime()
	const diffMs = now - lastSeen
	const diffMinutes = diffMs / (1000 * 60)
	const active = diffMinutes <= 3

	const handleSendMessage = async () => {
		if (!messageText.trim()) return
		setChatData((p) => [...p, newMessage])
		setMessageText("")
		// Realtime emit
		socket.emit("chat", {
			reciever: friend?._id,
			text: messageText,
			sender: user?._id
		})

		// Save to DB
		const newMessage = await sendMessage(friend?._id, messageText)
	}

	return (
		!loading && user && (
			<div className="shadow-[0px_0px_30px_rgba(0,0,0,0.2)] fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-6xl w-full md:rounded-xl h-screen md:h-[650px] md:flex gap-4 overflow-hidden">
				<LeftSideBar className="hidden md:block" />
				<div className="flex flex-grow h-full relative bg-white">

					{/* Header */}
					{friend && chatData?.length > 0 && (
						<div className="fixed md:absolute left-0 top-0 w-full py-3 px-4 flex items-center gap-3 shadow-sm border-b border-gray-200 bg-white z-10">
							<Avatar avatar={friend?.avatar} active={active} />
							<div>
								<h3 className="font-semibold text-gray-800">{friend.fullName}</h3>
								<p className="text-xs text-gray-500">
									{active ? "Active now" : "Last seen recently"}
								</p>
							</div>
						</div>
					)}

					{/* Messages */}
					<div className="flex flex-col w-full pt-[90px] pb-[60px] overflow-hidden">
						<div className="flex-grow overflow-y-auto px-4 space-y-3">
							{user && friend && chatData?.length <= 0 ? (
								<div className="h-full w-full flex flex-col items-center justify-center gap-3">
									<Avatar avatar={friend?.avatar} active={active} />
									<h2 className="text-2xl font-bold text-gray-800">{friend.fullName}</h2>
								</div>
							) : (
								<ul className="flex flex-col gap-3 pb-4">
									{chatData?.map(({ text, _id, senderId }) => {
										const isMyMessage = senderId !== friend?._id
										return (
											<li
												key={_id}
												className={`px-4 py-2 text-sm shadow-md max-w-[75%] break-words overflow-wrap ${
													isMyMessage
														? `bg-[#00b5db] text-white ms-auto rounded-bl-lg rounded-tr-lg`
														: "bg-[#878787] text-white mr-auto rounded-br-lg rounded-tl-lg"
												}`}
											>
												{text}
											</li>
										)
									})}
									<li ref={bottomRef} />
								</ul>
							)}
						</div>
					</div>

					{/* Input */}
					{user && friend ? (
						<div className="absolute bottom-0 left-0 w-full px-3 py-3 border-t border-gray-200 bg-white flex items-center gap-2">
							<input
								type="text"
								value={messageText}
								onChange={(e) => setMessageText(e.target.value)}
								placeholder="Type a message..."
								className="flex-grow py-2 px-4 rounded-full bg-gray-100 outline-none text-sm placeholder:text-gray-500"
								required
							/>
							<button
								onClick={handleSendMessage}
								className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white transition-colors"
							>
								<IoSend className="text-xl" />
							</button>
						</div>
					) : !loading && user && !friend ? (
						<div className="bg-white fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center flex-col gap-4">
							<h2 className="font-bold text-2xl">User does not exist</h2>
						</div>
					) : (
						<div className="bg-white fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center flex-col gap-4">
							<h2 className="font-bold text-2xl">Something went wrong</h2>
						</div>
					)}
				</div>
			</div>
		)
	)
}