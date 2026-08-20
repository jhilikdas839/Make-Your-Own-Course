import React from 'react'
import Navbar from './components/Nav'
import Footer from './components/Footer'
import Allroutes from './Routes/Allroutes'
import Home from "./pages/Home"


const App = () => {
  return (
    <div className='w=full'>
     
      <Navbar />
      
       <Allroutes />
       <Footer />
       
      
    </div>
  )
}

export default App