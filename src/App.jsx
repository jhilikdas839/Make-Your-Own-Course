import React from 'react'
import Navbar from './components/Nav'
import Allroutes from './Routes/Allroutes'
import Home from "./pages/Home"

const App = () => {
  return (
    <div className='w=full'>
     
      <Navbar />
      
       <Allroutes />
      
    </div>
  )
}

export default App