//* references
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'react-hot-toast'

import './index.css'

import ProtectedRoutes from './pages/routes/ProtectedRoutes'
import AppLayout from './pages/AppLayout'
import Home from './pages/Home/Home'
import Creators from './pages/blog/Creators'
import CreateBlog from './pages/blog/CreateBlog'
import Blog from './pages/blog/Blog'
import BlogLayout from './pages/blog/BlogLayout'
import BlogDetails from './pages/blog/BlogDetails'
import PageNotFound from './pages/errors/PageNotFound'

import Login from './pages/authentication/Login'
import SignUp from './pages/authentication/SignUp'
import UpdateBlog from './pages/blog/UpdateBlog'
import UserLayout from './pages/users/UserLayout'
import UserDetails from './pages/users/UserDetails'
import EditUser from './pages/users/EditUser'
import Suggestions from './pages/suggestions/Suggestions'
import SuggestionLayout from './pages/suggestions/SuggestionLayout'
import AdminLayout from './pages/admin/AdminLayout'
import AdminUsers from './pages/admin/AdminUsers'
import ProtectedAdminRoute from './pages/routes/ProtectedAdminRoute'
import AdminSugestion from './pages/admin/AdminSugestion'


function App() {
  //^ setting QueryClient for react-query
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
              <Route path='/blog/:blogid/edit' element={<UpdateBlog />} />
              <Route path='/blog/create-blog' element={<CreateBlog />} />
            </Route>
            <Route path='creators' element={<UserLayout />} >
              <Route path='/creators' element={<Creators />} />
              <Route path='/creators/:userid' element={<UserDetails />} />
              <Route path='/creators/:userid/edit' element={<EditUser />} />
            </Route>
            <Route path='suggestions' element={<SuggestionLayout />}>
              <Route path='/suggestions/:userid' element={<Suggestions />} />
            </Route>
            <Route path='admin' element={<ProtectedAdminRoute>
              <AdminLayout />
            </ProtectedAdminRoute>}>
              <Route path='/admin' element={<AdminUsers />} />
              <Route path='/admin/suggestion' element={<AdminSugestion />} />
            </Route>
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
