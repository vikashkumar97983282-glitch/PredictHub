import React from 'react'
import './App.css'
// import Home from './pages/home'
import Sidebar from './components/sidebar'
import Navbar from './components/navbar'

function App() {

  return (
    <>
      <div className='h-full w-full flex flex-wrap justify-between'>
        <div>
          <Sidebar/>
        </div>
        <div>
          <Navbar/>
        </div>
      </div>
    </>
  )
}

export default App
