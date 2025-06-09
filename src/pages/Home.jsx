import { useEffect, useState } from 'react'
import { useAppContext } from '../store/AppContext'
import { LeftSideBar } from '../components/ui/LeftSideBar'
import { useAuthContext } from '../store/AuthContext'

export const Home = () => {
	const { loading, setLoading } = useAppContext()
	const { user } = useAuthContext()

	
	return (
		!loading && user && <div className="shadow-[0px_0px_30px_rgba(0,0,0,0.2)] fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-6xl w-full md:rounded-xl p-4 h-screen md:h-[650px] md:flex gap-4">
			<LeftSideBar />
			<div className="hidden md:flex flex-grow h-full items-center justify-center flex-col gap-2">
					<img src={user?.avatar} alt={user?.fullName} className="max-w-[280px] max-h-[280px] h-full w-full rounded-full" />
						<h2 className="text-center font-bold text-3xl">Welcome back, {user?.fullName}</h2>
			</div>
		</div>
	)
}