import React, { useState } from 'react'
import {Navigate,Route,Routes} from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Refreshhandle from './Refreshhandle'
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const [userAuthenticated,setUserAuthenticated ] = useState(false)
  const PrivateRouting = ({children})=>{
    return userAuthenticated ? children : <Navigate to={'/login'}/>
  }

  return (
    <div>
      <Refreshhandle setUserAuthenticated ={setUserAuthenticated}/>
      <Routes>
        <Route path='/' element = {<Navigate to='/login'/>}/>
        <Route path='/login' element = {<Login/>}/>
        <Route path='/signup' element = {<Signup/>}/>
        <Route path='/home' element = {<PrivateRouting>
          <Home/>
        </PrivateRouting>}/>
      </Routes>
    </div>

  )
}

export default App
