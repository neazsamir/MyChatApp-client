import { useAppContext } from '../../store/AppContext.jsx'

export const Loader = () => {
	const { loading } = useAppContext()
  return (
   loading && <div className="fixed top-0 left-0 w-full min-h-screen flex justify-center items-center z-10 bg-white">
  	<div className="loader bg-white p-5 rounded-full flex space-x-3">
    <div className="w-5 h-5 bg-gray-800 rounded-full animate-bounce"></div>
    <div style={{ animationDelay: '0.2s'} } className="w-5 h-5 bg-gray-800 rounded-full animate-bounce"></div>
    <div style={{ animationDelay: '0.4s'} } className="w-5 h-5 bg-gray-800 rounded-full animate-bounce"></div>
  </div>

	</div>
  )
}