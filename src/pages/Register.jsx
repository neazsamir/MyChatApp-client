import { useState } from 'react'
import { createUser } from '../api/CreateUser.jsx'
import { useAuthContext } from '../store/AuthContext.jsx'
import { Link, useNavigate } from 'react-router-dom'


export const Register = () => {
  const { setUser } = useAuthContext()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const success = await createUser(formData, navigate)
    if (success) navigate("/")
  }

  return (
    <div className="fixed inset-0 w-screen h-screen p-4 bg-[url(register-bg.jpg)] bg-cover bg-center flex items-center justify-center overflow-hidden">
      <div className="relative max-w-xl w-full p-8 rounded-lg shadow-lg overflow-hidden before:content-[''] before:absolute before:inset-0 before:shadow-[inset_0_0_2000px_rgba(255,255,255,0.5)] before:backdrop-blur-md before:z-[-1] text-white">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center text-white mb-5">Register</h1>
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-5">
          {[
            { type: 'text', name: 'fullName', placeholder: 'Full name' },
            { type: 'email', name: 'email', placeholder: 'Email' },
            { type: 'password', name: 'password', placeholder: 'Password' }
          ].map(({ type, name, placeholder }) => (
            <input
              key={name}
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              required
              placeholder={placeholder}
              className="w-full bg-transparent outline-none py-3 border-b border-white placeholder:text-lg placeholder:text-white"
            />
          ))}
          <button type="submit" className="w-full bg-white py-3 rounded-md font-bold text-[#162938]">
            Register
          </button>
          <Link to="/login" className="text-white font-bold">
            Login to existing account
          </Link>
        </form>
      </div>
    </div>
  )
}