import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { register } from 'swiper/element/bundle';
import { Toaster} from 'react-hot-toast'

import './index.css'

import { routes } from './App.tsx'
import AuthProvider from './contexts/AuthContext.tsx'

// register Swiper custom elements
register();
import './swipercss.css'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toaster 
      position='top-right'
      reverseOrder={false}
    />
    <AuthProvider>
      <RouterProvider router={routes} />
    </AuthProvider>
  </StrictMode>,
)
