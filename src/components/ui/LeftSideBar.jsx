import { FriendsCard } from './FriendsCard'
import getAllFriends from '../../api/GetAllFriends.js'
import { searchFriend } from '../../api/SearchFriend.js'
import { getLastMessage } from '../../api/GetLastMessage.js'
import { useAuthContext } from '../../store/AuthContext'
import { useAppContext } from '../../store/AppContext'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'



export const LeftSideBar = (props) => {
  const { user } = useAuthContext()
  const { setLoading } = useAppContext()
  const [searchResLoading, setSearchResLoading] = useState(false)
  const [searcQuery, setSearchQuery] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const [friends, setFriends] = useState([])

  useEffect(() => {
    const fetchFriends = async () => {
      const myFriends = await getAllFriends(setLoading)

      const friendsWithLastMessages = await Promise.all(
        myFriends.map(async (friend) => {
          try {
            const lastMessage = await getLastMessage(friend._id)
            return { ...friend, lastMessage }
          } catch {
            return { ...friend, lastMessage: null }
          }
        })
      )

      friendsWithLastMessages.sort((a, b) => {
        const aTime = a.lastMessage?.createdAt ? new Date(a.lastMessage.createdAt).getTime() : 0
        const bTime = b.lastMessage?.createdAt ? new Date(b.lastMessage.createdAt).getTime() : 0
        return bTime - aTime
      })

      setFriends(friendsWithLastMessages)
    }

    fetchFriends()
  }, [user])

  const handleChange = async (e) => {
    setSearchQuery(e.target.value)
    setSearchResLoading(true)
    try {
      const data = await searchFriend(e.target.value)
      setSearchResult(data)
    } catch (e) {
      console.log(e)
    } finally {
      setSearchResLoading(false)
    }
  }

  return (
    <div className={`md:w-[35%] w-full h-full relative ${props.className} md:p-3 pt-3`}>
    <div className="flex mb-3 items-center justify-between">
    <Link to="/" className="font-bold text-xl">MyChatApp</Link>
    <Link to="/profile" className="font-extrabold text-sm underline">PROFILE</Link>
    </div>
      <input
        type="search"
        onChange={handleChange}
        value={searcQuery}
        className="mt-5 md:mt-0 block w-full px-3 py-2 outline-none border border-solid border-gray-800 rounded"
        placeholder="Search friend"
      />
      {
        !searcQuery && friends?.length ? (
          <div className="flex flex-col justify-center items-center gap-4 mt-10">
            {
              friends.map(friend => <FriendsCard key={friend._id} setSearchResLoading={setSearchResLoading} friend={friend} />)
            }
          </div>
        ) : searcQuery && searchResult?.length ? (
          <div className="flex flex-col justify-center items-center gap-4 mt-10">
            {
              searchResult.map(friend => <FriendsCard key={friend._id} setSearchResLoading={setSearchResLoading} friend={friend} />)
            }
          </div>
        ) : !searchResult?.length && searcQuery ? (
          (<h2 className="text-2xl font-bold text-gray-800 w-full text-center absolute left-1/2 -translate-y-1/2 -translate-x-1/2 top-1/2">No friend found</h2>)
        ) : !friends?.length && !searcQuery ? (
          <h2 className="text-2xl font-bold text-gray-800 w-full text-center absolute left-1/2 -translate-y-1/2 -translate-x-1/2 top-1/2">Start searching friends</h2>
        ) : searchResLoading ? (
          <div className="loader bg-white p-5 rounded-full flex space-x-3">
            <div className="w-5 h-5 bg-gray-800 rounded-full animate-bounce"></div>
            <div style={{ animationDelay: '0.2s' }} className="w-5 h-5 bg-gray-800 rounded-full animate-bounce"></div>
            <div style={{ animationDelay: '0.4s' }} className="w-5 h-5 bg-gray-800 rounded-full animate-bounce"></div>
          </div>
        ) : (
          <h2 className="text-2xl font-bold text-gray-800 w-full text-center absolute left-1/2 -translate-y-1/2 -translate-x-1/2 top-1/2">Something went wrong</h2>
        )
      }
    </div>
  )
}