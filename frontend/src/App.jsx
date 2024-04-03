import { Button, Container } from '@chakra-ui/react'
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import UserPage from './pages/UserPage.jsx'
import PostPage from './pages/PostPage.jsx'
import Header from './components/Header.jsx'
import HomePage from './pages/HomePage.jsx'
import AuthPage from './pages/AuthPage.jsx'
import { useRecoilValue } from 'recoil'
import userAtom from './atoms/userAtom.js'
import LogOut from './components/LogOut.jsx'
import UpdateProfile from './pages/UpdateProfile.jsx'

function App() {
  const user=useRecoilValue(userAtom)
  return (
    <>
    <Container maxWidth="620px">
      <Header/>
  <Routes>
    <Route path='/' element={user?<HomePage/>:<Navigate to={"/auth"}/>}></Route>
    <Route path='/auth' element={!user?<AuthPage/>:<Navigate to={'/'}/>}></Route>
    <Route path='/update' element={user?<UpdateProfile/>:<Navigate to={'/auth'}/>}></Route>
    <Route path='/:username' element={<UserPage/>}></Route>
    <Route path='/:username/post/:pid' element={<PostPage/>}></Route>
    </Routes>
    {user && <LogOut/>}
    </Container>
    </>
  )
}

export default App