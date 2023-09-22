import React from 'react'
import store from './store';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client'
import {createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import App from './App.jsx'
import './index.css'
import Home from './screens/Home.jsx'
import Login from './screens/Login.jsx'
import Register from './screens/Register.jsx'
import Profile from './screens/Profile';
import PrivateRoute from './components/PrivateRoute';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index path ="/" element= {<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='' element={<PrivateRoute />} >
      <Route path='/profile' element={<Profile />} />
      </Route>
      
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(

  <Provider store={store}>
  <React.StrictMode>
   <RouterProvider router={router} />
  </React.StrictMode>
  </Provider>,
)
