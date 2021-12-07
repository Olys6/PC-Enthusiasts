import React, { useState } from 'react'

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { Form } from 'react-bootstrap'
// import { Row } from 'react-bootstrap'
// import { Col } from 'react-bootstrap'
import { Alert } from 'react-bootstrap'
import { FloatingLabel } from 'react-bootstrap'

// import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'
const csrftoken = Cookies.get('csrftoken')

const LoginPopup = (props) => {
  
  // const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })

  const [error, setError] = useState(false)

  const handleForm = (event) => {
    const newFormData = { ...formData, [event.target.name]: event.target.value }
    setFormData(newFormData)
  }

  const [isLoggedin, setIsLoggedin] = useState(false)

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const config = {
        method: 'post',
        url: '/api/auth/login/',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': csrftoken,
        },
        data: formData,
        // body: data,
      }
      const response = await axios(config)
      // console.log('RESPONSE ->', response)
      // const { data } = await axios.post('/api/auth/login/', formData)
      // console.log(response.data.token)
      setItemToLocalStorage(response.data.token)
      setUsernameFromLocalStorage(formData.username)
      setInterval(function(){
        window.location.reload()
      }, 1800)
      
      setIsLoggedin(true)
      setError(false)
    } catch (err) {
      // console.log(err)
      setError(true)
      setIsLoggedin(false)
    }
  }

  const setItemToLocalStorage = (token) => {
    window.localStorage.setItem('token', token)
  }

  // console.log(window.localStorage)

  const setUsernameFromLocalStorage = () => {
    window.localStorage.setItem('username', formData.username)
  }

  // console.log('IS LOGGED IN? ->', isLoggedin)

  // const [token, setToken] = useState()

  // if(!token) {
  //   return (
  //     <Login
  //   )
  // }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Form className="form" onSubmit={handleLogin}>
        <Modal.Header closeButton className="modalHeader">
          <Modal.Title><i className="fas fa-user-circle"></i> Log in </Modal.Title>
        </Modal.Header>
        {/* <Alert>this is an Alert</Alert> */}
        {isLoggedin && <Alert variant="success" className="loginAlert animate__animated animate__bounceIn">Success! You are now logged in</Alert>}
        {error && <Alert variant="danger" className="loginAlert animate__animated animate__shakeX">Your username and/or password is incorrect</Alert>}
        
        <Form.Group>
          <FloatingLabel
            controlId="floatingInput"
            label="Username"
            className="mb-3 floatingLabel"
          >
            <Form.Control value={formData.username} name="username" placeholder="Username" onChange={handleForm} />
          </FloatingLabel>
        </Form.Group>
        <Form.Group>
          <FloatingLabel
            controlId="floatingInput"
            label="Password"
            className="mb-3 floatingLabel"
          >
            <Form.Control value={formData.password} name="password" placeholder="Password" onChange={handleForm}/>
          </FloatingLabel>
        </Form.Group>

        <Button variant="primary" type="submit" className="formBtn">
          Login
        </Button>
      </Form>
    </Modal>
  )
}

export default LoginPopup