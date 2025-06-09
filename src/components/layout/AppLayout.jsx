import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast'
import { useAppContext } from '../../store/AppContext'
import { useAuthContext } from '../../store/AuthContext'




export const AppLayout = () => {
  const location = useLocation();
  const navigate = useNavigate()
  const { loading, setLoading } = useAppContext()
  const { user, setUser } = useAuthContext()
  const API = `https://mychatapp-server-1.onrender.com/api`
  
  const getUser = async () => {
  	setLoading(true)
	try {
		const res = await fetch(`${API}/auth/check`, { method: "GET", credentials: 'include' })
		const data = await res.json()
		if (!data.success) {
			setUser(null)
			if (!["/login", "/register", "/reset"].includes(location.pathname)) {
				navigate('/login')
			}
		} else {
			setUser(data.user)
			if (["/login", "/register"].includes(location.pathname)) {
				navigate("/")
			} 
		}
	} catch (e) {
		console.log(e)
		toast.error("Something went wrong")
	} finally {
		setLoading(false)
	}
}

  useEffect(() => {
  	getUser()
  }, [location.pathname])
  
  
  
  const updateLastSeen = async () => {
  	try {
  		const res = await fetch(`${API}/message/lastSeen/${user._id}`, { method: "PATCH", credentials: 'include' })
  	} catch (e) {
		console.log(e)
		} 
  }

useEffect(() => {
  if (!user) return;
  updateLastSeen();

  const interval = setInterval(() => {
    updateLastSeen();
  }, 180000);
  
  return () => clearInterval(interval);
}, [user]);
  
  
  return (
    <div className={`mx-auto ${!["/login", "/register", "reset"].includes(location.pathname) ? "max-w-7xl" : ''}`}>
      <Outlet />
    </div>
  )
}