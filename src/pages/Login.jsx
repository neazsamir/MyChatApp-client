import { useState } from 'react'
import { loginUser } from '../api/LoginUser'
import { useAuthContext } from '../store/AuthContext.jsx'
import { Link, useNavigate} from 'react-router-dom'



export const Login = () => {
	const { setUser } = useAuthContext()
  const navigate = useNavigate()
	const [formData, setFormData] = useState({
		email: '',
		password: ''
	})
	const handleChange = (e) => {
		const name = e.target.name
		const value = e.target.value
		setFormData((p) => ({...p, [name]: value}))
	}
	const handleSubmit = async (e) => {
		e.preventDefault()
		const success = await loginUser(formData, setUser, navigate)
		if (success) navigate("/")
	}
	return (
		<div className="fixed inset-0 w-screen h-screen bg-[url(login-bg.jpg)] bg-cover bg-center flex items-center justify-center p-4 overflow-hidden">
  <div className="relative max-w-xl w-full p-8 rounded-lg shadow-lg overflow-hidden before:content-[''] before:absolute before:inset-0 before:shadow-[inset_0_0_2000px_rgba(255,255,255,0.5)] before:backdrop-blur-md before:z-[-1]">
    <h1 className="text-3xl md:text-4xl font-extrabold text-center text-[#162938] mb-5">Login</h1>
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-5">
      {['email', 'password'].map((type) => (
        <input
          key={type}
          type={type}
          name={type}
          value={formData[type]}
          onChange={handleChange}
          required
          placeholder={type.charAt(0).toUpperCase() + type.slice(1)}
          className="w-full bg-transparent outline-none py-3 border-b border-[#162938] placeholder:text-lg placeholder:text-[#162938]"
        />
      ))}
      <Link to="/reset" className="text-[#162938] font-bold w-full text-end">
        Forgotten password?
      </Link>
      <button type="submit" className="w-full bg-[#162938] text-white font-bold py-3 rounded-md">
        Login
      </button>
      <Link to="/register" className="text-[#162938] font-bold">
        Create a new account
      </Link>
    </form>
  </div>
</div>
	)
}