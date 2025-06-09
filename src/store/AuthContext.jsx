import { createContext, useContext, useState } from 'react'
import { useAppContext } from './AppContext.jsx'

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
	const { loading, setLoading } = useAppContext()
	const [user, setUser] = useState(null)
	return (
		<AuthContext.Provider value={{user, setUser}}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuthContext = () => useContext(AuthContext);


