import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from './pages/AppLayout'
import './index.css'
import Home from './pages/Home'
import Blog from './pages/Blog'
import Creators from './pages/Creators'
import CreateBlog from './pages/CreateBlog'
import Profile from './pages/Profile'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import PageNotFound from './pages/PageNotFound'
function App() {
  return (
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
        </Route>
        <Route path='login' element={<Login />} />
        <Route path='SignUp' element={<SignUp />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
