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
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to='home' />} />
            <Route path='home' element={<Home />} />
            <Route path='blogs' element={<Blog />} >
              <Route path='/blogs/create-blog' element={<CreateBlog />} />
            </Route>
            <Route path='users' element={<Creators />} />
            <Route path='profile' element={<Profile />} />
            <Route path='login' element={<Login />} />
            <Route path='SignUp' element={<SignUp />} />
          </Route>
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
