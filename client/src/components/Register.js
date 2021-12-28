import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { Alert, FloatingLabel, Form } from 'react-bootstrap'
// import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'
const csrftoken = Cookies.get('csrftoken')
// import { getToken } from '../auth.js'

const RegisterPopup = (props) => {
  
  // const navigate = useNavigate()

  const [registerFormData, setRegisterFormData] = useState({
    username: '',
    password: '',
    password_confirmation: '',
  })

  const [loginFormData, setLoginFormData] = useState({
    username: '',
    password: '',
  })

  const [errors, setErrors] = useState({
    username: '',
    password: '',
    password_confirmation: '',   
  })

  const handleForm = (event) => {
    // ---- Register form handling ----

    const newFormData = { ...registerFormData, [event.target.name]: event.target.value }
    console.log(newFormData)
    setRegisterFormData(newFormData)

    // ---- Login form handling -----

    const newErrors = { ...errors, [event.target.name]: '' }
    const newLoginFormData = { ...loginFormData, [event.target.name]: event.target.value }
    setLoginFormData(newLoginFormData)
    setErrors(newErrors)
  }

  const [registerSuccess, setRegisterSuccess] = useState(false)

  const handleRegister = async event => {
    event.preventDefault()
    // console.log('SUBMITTING')
    try {

      // ------------- register ---------------
      console.log(registerFormData)
      const config = {
        method: 'post',
        url: '/api/auth/register/',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': csrftoken,
        },
        data: registerFormData,
        // body: data,
      }
      
      const response = await axios(config)
      console.log(response)

      // ------------- Login after register ---------------

      const loginConfig = {
        method: 'post',
        url: '/api/auth/login/',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': csrftoken,
        },
        data: loginFormData,
        // body: data,
      }
      const loginResponse = await axios(loginConfig)

      setItemToLocalStorage(loginResponse.data.token)
      setUsernameFromLocalStorage(loginFormData.username)

      // ------------ register --------------

      // await axios.post('api/auth/register/', formData)
      // navigate('/login')
      setRegisterSuccess(true)
      setTimeout(function(){
        window.location.reload()
      }, 1800)

    } catch (err) {
      console.log(err)
      setErrors(err.response.data)
      console.log(errors)
    }
  }

  // ------ set the token in local storage to remind that we are logged in --------

  const setItemToLocalStorage = (token) => {
    window.localStorage.setItem('token', token)
  }

  const setUsernameFromLocalStorage = () => {
    window.localStorage.setItem('username', loginFormData.username)
  }

  // --------------------------------------------

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby=""
      centered
    >
      <Form className="form" onSubmit={handleRegister} >
        <Modal.Header closeButton className="modalHeader">
          <Modal.Title><i className="fas fa-address-book"></i> Register</Modal.Title>
        </Modal.Header>
        {registerSuccess && <Alert variant="success" className="loginAlert animate__animated animate__bounceIn">You have successfully created an account! You are now logged in.</Alert>}
        {errors.username && <Alert variant="warning" className="loginAlert animate__animated animate__headShake">This username is already in use</Alert>}
        {errors.password && <Alert variant="danger" className="loginAlert animate__animated animate__headShake">Password must to be at least 8 characters long</Alert>}
        {errors.password_confirmation && <Alert variant="danger" className="loginAlert animate__animated animate__headShake">Passwords do not match!</Alert>}
        <Form.Group>
          <FloatingLabel controlId="floatingInput" label="Username" className="mb-3 floatingLabel">
            <Form.Control value={registerFormData.username} name="username" placeholder="Username" onChange={handleForm} />
          </FloatingLabel>
        </Form.Group>

        <Form.Group>
          <FloatingLabel controlId="floatingInput" label="Password" className="mb-3 floatingLabel">
            <Form.Control value={registerFormData.password} name="password" placeholder="Password" onChange={handleForm} />
          </FloatingLabel>
        </Form.Group>

        <Form.Group>
          <FloatingLabel controlId="floatingInput" label="Password Confirmation" className="mb-3 floatingLabel">
            <Form.Control value={registerFormData.password_confirmation} name="password_confirmation" placeholder="Password" onChange={handleForm} />
          </FloatingLabel>
        </Form.Group>

        <Button variant="primary" type="submit" className="formBtn">
          Register
        </Button>
      </Form>
    </Modal>
  )
}

export default RegisterPopup