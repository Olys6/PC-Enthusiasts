import React from 'react'
// import axios from 'axios'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar.js'
import Home from './components/Home.js'
import Components from './components/Components.js'
import Component from './components/Component.js'
import Footer from './components/Footer.js'

function App() {
  // React.useEffect(() => {
  //   const getData = async () => {
  //     const res = await axios.get('/api/endpoint') // * <-- replace with your endpoint
  //     console.log(res.data)
  //   }
  //   getData()
  // })

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/components' element={<Components />} />
          <Route exact path='/components/:pk/' element={<Component />} />
        </Routes>
        <Footer />
      </BrowserRouter>
      
    </>

  )
}

export default App
