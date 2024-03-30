import { Button, Container } from '@chakra-ui/react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import UserPage from './pages/UserPage.jsx'
import PostPage from './pages/PostPage.jsx'
import Header from './components/Header.jsx'

function App() {

  return (
    <>
    <Container maxWidth="620px">
      <Header/>
  <Routes>
    <Route path='/:username' element={<UserPage/>}></Route>
    <Route path='/:username/post/:pid' element={<PostPage/>}></Route>

    </Routes>
    </Container>
    </>
  )
}

export default App