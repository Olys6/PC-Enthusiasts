import React from 'react'
import axios from 'axios'
// import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar.js'
import Home from './components/Home.js'

function App() {
  React.useEffect(() => {
    const getData = async () => {
      const res = await axios.get('/api/endpoint') // * <-- replace with your endpoint
      console.log(res.data)
    }
    getData()
  })

  return (
    <>
      <NavBar />
      <Home />
    </>

  )
}

export default App
