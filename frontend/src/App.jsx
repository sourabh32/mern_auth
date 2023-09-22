import React from 'react'
import Header from './components/Header'
import Home from './screens/Home'
import { Outlet } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import {Toaster} from "react-hot-toast"
const App = () => {
  return (
    <>
    <Toaster />
    <Header />
    <Container className='my-2'>
      <Outlet />
    </Container>
  </>
  )
}

export default App
