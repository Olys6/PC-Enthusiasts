import React, { useState, useEffect } from 'react'
import axios from 'axios'
// import Cookies from 'js-cookie'
// const csrftoken = Cookies.get('csrftoken')
import { Link } from 'react-router-dom'

const MyBuilds = () => {

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
        console.log('data ->', data)
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
        getData()
        setBuilds(data)
        
      } catch (err) {
        console.log(err)
        // setHasError(true)
      }
    }
    getData()
  }, [userToken])

  // getUsernameFromLocalStorage()

  // const makeNewBuild = () => {

  //   const makeData = async() => {
  //     try {
        
  //       const { data } = await axios.post(
  //         '/api/builds',

  //         {
  //           headers: { Authorization: `Bearer ${userToken}` },
  //         }
  //       )

  //     } catch (err) {
  //       console.log(err)
  //     }
  //   }

  // }


  return (
    <>
      {/* <h2>{builds[1].title}</h2> */}
      <div className="container builds columns is-multiline">
        
        {builds.map(build => (

          <Link to={`/myBuilds/${build.id}`} key={build.id} className="column  is-one-fifth buildCard ">
            <div className="buildCardInside ">
              <h3 className="removeTextDecoration buildH3">{build.title}</h3>
              <p className="removeTextDecoration buildUser">Made by {build.user}</p>
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