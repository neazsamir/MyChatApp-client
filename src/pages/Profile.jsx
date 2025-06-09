import { useState, useRef, useEffect } from 'react'
import { useAuthContext } from '../store/AuthContext'
import { useAppContext } from '../store/AppContext'
import { Link, useNavigate } from 'react-router-dom'
import { FaCamera } from 'react-icons/fa6'
import { uploadAvatar } from '../api/UploadAvatar'
import { toast } from 'react-hot-toast'
import { logout } from '../api/Logout.js'


export const Profile = () => {
	const navigate = useNavigate()
	const { setUser, user } = useAuthContext()
	const { loading } = useAppContext()
	const [uploading, setUploading] = useState(false)
	const [loggingOut, setLoggingOut] = useState(false)
	const [selectedImage, setSelectedImage] = useState(user?.avatar)
	const fileRef = useRef(null)
	
	const handleFileChange = (e) => {
		const file = e.target.files?.[0]
		if (file){
			const reader = new FileReader
			reader.readAsDataURL(file)
			reader.onload = async () => {
				const base64image = reader.result
				setSelectedImage(base64image)
			}
		}
	}
	
	
	const handleUpload = async () => {
	if (selectedImage === user?.avatar) return
	setUploading(true)
	try {
		const uploadedUrl = await uploadAvatar(selectedImage)
	if (uploadedUrl) {
		// Send to backend
		const res = await fetch(`https://mychatapp-server-1.onrender.com/api/auth/profile`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify({ avatar: uploadedUrl })
		})
		const data = await res.json()
		if (data?.success) {
		toast.success(data?.msg)
		setUser((prev) => ({ ...prev, avatar: uploadedUrl }))
	} else {
		toast.error(data?.msg)
	}
	}
	} catch (e) {
		console.log(e)
		toast.error("Failed to upload")
	} finally {
		setUploading(false)
	}
}
	
	const handleLogout = async () => {
	setLoggingOut(true)
	try {
		const data = await logout()
		if (data?.success) {
		navigate("/login")
		toast.success("Logged out")
		setUser(null)
	} else {
		toast.error(data?.msg || "Failed")
		}
	} catch (e) {
		console.log(e)
		toast.error("Failed to logout")
	} finally {
		setLoggingOut(false)
	}
}
	
	return (
	user && !loading &&	<div className="fixed inset-0 w-screen h-screen bg-[url(profile-bg.jpg)] bg-cover bg-center flex items-center justify-center p-4 overflow-hidden">
  <div className="relative text-white max-w-xl w-full p-8 rounded-lg shadow-lg overflow-hidden before:content-[''] before:absolute before:inset-0 before:shadow-[inset_0_0_2000px_rgba(255,255,255,0.5)] before:backdrop-blur-md before:z-[-1]">
    <h1 className="text-3xl md:text-4xl font-extrabold text-center  mb-5">Profile</h1>
    <form className="flex flex-col items-center gap-5">
    <div className="relative w-fit rounded-full overflow-hidden group">
    	<img onClick={() => fileRef.current.click()} src={selectedImage || user?.avatar} alt="My avatar"  className="h-16 w-16 border-[3px] border-solid border-[#00a9ff] p-[1px] rounded-full" />
    	<FaCamera className="text-2xl text-white absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition duration-300 ease-in z-10 pointer-events-none" />
    <div className="absolute top-0 right-0 bottom-0 left-0 bg-[rgba(0,0,0,0.7)] opacity-0 group-hover:opacity-70 duration-300 ease-in transition pointer-events-none" />
    </div>
    <input ref={fileRef} type="file" accept="image/**" onChange={handleFileChange} className="hidden" />
      <input type="text" value={user?.fullName} disabled className="w-full bg-transparent outline-none py-3 border-b border-white" />
      <input type="text" value={user?.email} disabled className="w-full bg-transparent outline-none py-3 border-b border-white" />
      <button type="button" onClick={handleUpload} className="w-full bg-white text-[#162938] font-bold py-3 rounded-md">
        { uploading ? "Uploading..." : "Upload"}
      </button>
      <button onClick={handleLogout} type="button" className="w-full bg-red-500 text-white font-bold py-3 rounded-md">
        { loggingOut ? "Logging out" : "Logout"  }
      </button>
    </form>
  </div>
</div>
	)
}