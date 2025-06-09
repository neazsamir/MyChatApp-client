import { createContext, useContext, useState } from 'react'


export const AppContext = createContext()

export const AppProvider = ({children}) => {
	const [loading, setLoading] = useState(true)
	return (
		<AppContext.Provider value={{loading, setLoading}}>
			{children}
		</AppContext.Provider>
	)
}

export const useAppContext = () => useContext(AppContext);