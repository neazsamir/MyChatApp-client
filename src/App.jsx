import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { Toaster } from 'react-hot-toast'
import { Loader } from './components/ui/Loader'
import { Chat } from './pages/Chat'
import { Profile } from './pages/Profile'



export const App = () => {
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/login',
          element: <Login />,
        },
        {
          path: '/Register',
          element: <Register />,
        },
        {
          path: '/profile',
          element: <Profile />,
        },
        {
          path: '/Chat/:id',
          element: <Chat />,
        },
      ],
    },
  ]);

  return (
		<>
			<Loader />
			<Toaster position="top-center" />
     	<RouterProvider router={router} />
		</>
  )
}