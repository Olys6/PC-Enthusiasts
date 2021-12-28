import React from 'react'
// import axios from 'axios'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar.js'
import Home from './components/Home.js'
import Components from './components/Components.js'
import Component from './components/Component.js'
import Footer from './components/Footer.js'
import MyBuilds from './components/MyBuilds.js'
import Guides from './components/Guides.js'
import CreateBuild from './components/CreateBuild.js'
import CreatedBuild from './components/CreatedBuild.js'
// import NoMatch from './components/NoMatch.js'

function App() {
  // React.useEffect(() => {
  //   const getData = async () => {
  //     const res = await axios.get('/api/endpoint') // * <-- replace with your endpoint
  //     console.log(res.data)
  //   }
  //   getData()
  // })

  // const Child = ({ match }) => {
  //   if (match.params.username !== 'valid_username') {
  //     return (
  //       <>
  //         <Navigate to='/404' />
  //       </>
  //     )
  //   }
  // }


  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/components' element={<Components />} />
          <Route exact path='/components/:pk/' element={<Component />} />
          <Route exact path='/myBuilds' element={<MyBuilds />} />
          <Route exact path='/build/:pk/' element={<CreatedBuild />} />
          <Route exact path='createBuild' element={<CreateBuild />} />
          <Route exact path='/guides' element={<Guides />} />
          {/* <Route exact path='/404' element={<NoMatch />} />
          <Route element={<NoMatch />} /> */}
        </Routes>
        <Footer />
      </BrowserRouter>
      
    </>

  )
}

export default App
