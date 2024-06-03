import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from './pages/AppLayout'
import './index.css'
import Home from './pages/Home/Home'
import Blog from './pages/blog/Blog'
import Creators from './pages/blog/Creators'
import CreateBlog from './pages/blog/CreateBlog'
import Profile from './pages/authentication/Profile'
import Login from './pages/authentication/Login'
import SignUp from './pages/authentication/SignUp'
import PageNotFound from './pages/errors/PageNotFound'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'react-hot-toast'
import ProtectedRoutes from './pages/routes/ProtectedRoutes'
import BlogLayout from './pages/blog/BlogLayout'
import BlogDetails from './pages/blog/BlogDetails'
function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0
      }
    }
  })
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoutes>
            <AppLayout />
          </ProtectedRoutes>}>
            <Route index element={<Navigate replace to='home' />} />
            <Route path='home' element={<Home />} />
            <Route path='blogs' element={<Blog />} />
            <Route path='blog' element={<BlogLayout />}>
              <Route path='/blog/:blogid' element={<BlogDetails />} />
            </Route>
            <Route path='users' element={<Creators />} />
            <Route path='profile' element={<Profile />} />
          </Route>
          <Route path='login' element={<Login />} />
          <Route path='SignUp' element={<SignUp />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="bottom-left"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "var(--color-grey-0)",
            color: "var(--color-grey-700)",
          },
        }}
      />
    </QueryClientProvider>
  )
}

export default App
