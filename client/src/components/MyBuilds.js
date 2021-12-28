import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { getUsernameFromLocalStorage } from './helpers/authentication'
// import Cookies from 'js-cookie'
// const csrftoken = Cookies.get('csrftoken')
import { Link } from 'react-router-dom'

const MyBuilds = () => {

  // const [buildShow, setBuildShow] = useState(false)
  const [userToken, setUserToken] = useState()

  useEffect(() => {
    const getTokenFromLocalStorage = () => {
      setUserToken(window.localStorage.getItem('token'))
    }
    getTokenFromLocalStorage()
  }, [])

  const [builds, setBuilds] = useState([])

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(
          '/api/builds',
          {
            headers: { Authorization: `Bearer ${userToken}` },
          }
        )
        // console.log('data ->', data)
        // const config = {
        //   method: 'get',
        //   url: '/api/builds',
        //   headers: {
        //     Authorization: `Bearer ${userToken}`,
        //     'Content-Type': 'application/json',
        //     'X-CSRF-TOKEN': csrftoken,
        //   },
        //   // data: registerFormData,
        //   // body: data,
        // }
        // const data = await axios(config)
        
        setBuilds(data)
        
      } catch (err) {
        console.log(err)
        // setHasError(true)
      }
    }
    getData()
  }, [userToken])



  // function handleBuildShow() {
  //   if (buildShow === true) {
  //     return setBuildShow(false)
  //   } else if (buildShow === false) {
  //     return setBuildShow(true)
  //   }
  //   console.log('buildShow')
  // }

  const username = getUsernameFromLocalStorage()

  const userBuilds = builds.filter(build => (
    build.user === username
  ))

  

  return (
    <>
      {/* <h2>{builds[1].title}</h2> */}
      {/* <div className="buildsSwitch">
        <h2>Your Builds</h2>
        <label className="switch"  >
          <input type="checkbox" />
          <span className="slider"></span>
        </label>
        <h2>All Builds</h2>
      </div> */}
      <div className="container builds columns is-multiline">
 
        {userBuilds.map(build => (

          <Link to={`/build/${build.id}`} key={build.id} className="column  is-one-fifth buildCard ">
            <div className="buildCardInside ">
              <h4 className="removeTextDecoration buildH3">{build.title}</h4>
              <p className="removeTextDecoration buildUser">Made by you</p>
            </div>
            
          </Link>
        
        ))}
        <Link to='/createBuild/' className="column is-one-fifth makeBuild">
          <h3><i className="fas fa-plus"></i></h3>
          <p>Make new build!</p>
        </Link>
      </div>
    </>
  )
}

export default MyBuilds