import { toast } from 'react-hot-toast'

// src/api/uploadAvatar.js

export const uploadAvatar = async (base64image) => {
	try {
		const formData = new FormData()
		formData.append('image', base64image.split(',')[1]) // remove "data:image/..."

		const res = await fetch(`https://api.imgbb.com/1/upload?key=916d7025f20f968a6388b02443210b24`, {
			method: 'POST',
			body: formData
		})

		const data = await res.json()
		if (data.success) {
			return data.data.url // usable image URL
		} else {
			console.error('ImgBB upload failed:', data)
			toast.error("Failed to upload")
			return null
		}
	} catch (err) {
		toast.error("Failed to upload")
		console.error('Upload error:', err)
		return null
	}
}
