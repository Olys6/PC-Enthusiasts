import React, { useState, useEffect } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import { Nav } from 'react-bootstrap'
import { Container } from 'react-bootstrap'
import { NavDropdown } from 'react-bootstrap'
import RegisterPopup from './Register'
import LoginPopup from './Login'
// import { Link } from 'react-router-dom'
import { getUsernameFromLocalStorage } from './helpers/authentication'
import { getPayload } from './helpers/authentication'


const NavBar = () => {

  const [registerModal, setRegisterModal] = useState(false)
  const [loginModal, setLoginModal] = useState(false)

  useEffect(() => {
    // console.log('GET PAYYYLOOADD', getPayload())
  }, [loginModal])

  const userIsAuthenticated = () => {
    const payload = getPayload()
    // console.log('payload ->', payload)
    if (!payload) return false
    // const now = Math.round(Date.now() / 1000)
    // return now < payload.exp
    return true
  }

  // console.log('is user logged in? ->', userIsAuthenticated())

  const handleLogout = () => {
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('username')
    window.location.reload(true)
  }

  // console.log(window.localStorage)
  const username = getUsernameFromLocalStorage()

  return (
    <>
      <Navbar bg="dark" variant="dark" className="Navbar is-fixed-top" fixed="top" name="top">
        <Container>
          <Navbar.Brand href="/">
            <img
              src="https://i.imgur.com/LDQuJuN.png"
              width="110"
              height=""
              className="d-inline-block align-top"
              alt="PC Enthusiasts logo"
            />
          </Navbar.Brand>
          <Nav className="me-auto">
            {/* <Nav.Link href="/">Home</Nav.Link> */}
            <Nav.Link href="/components"><i className="fas fa-microchip"></i>Components</Nav.Link>
            {!userIsAuthenticated() ?
              <>
                
              </>
              :
              <>
                {/* <Nav.Link href="/myBuilds"><i className="fas fa-toolbox"></i>My Builds</Nav.Link> */}
              </>
            }
          </Nav>
          <Nav className="d-flex">
            {!userIsAuthenticated() ?
              <>
                <NavDropdown title="Join now" id="navbarScrollingDropdown">
                  <NavDropdown.Item onClick={() => setRegisterModal(true)} ><i className="fas fa-address-book"></i> Register</NavDropdown.Item>
                  <RegisterPopup
                    show={registerModal}
                    onHide={() => setRegisterModal(false)}
                  />
                  <NavDropdown.Item onClick={() => setLoginModal(true)} ><i className="fas fa-user-circle"></i> Login</NavDropdown.Item>
                  <LoginPopup
                    show={loginModal}
                    onHide={() => setLoginModal(false)}
                  />
                  <NavDropdown.Item href="/guides"><i className="fas fa-book-open"></i> Guides</NavDropdown.Item>
                </NavDropdown>
              </>
              :
              <>
                <NavDropdown title={username} id="navbarScrollingDropdown">
                  <NavDropdown.Item href="/myBuilds"><i className="fas fa-toolbox"></i> My Builds</NavDropdown.Item>
                  <NavDropdown.Item href="/guides"><i className="fas fa-book-open"></i> Guides</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item eventKey="4" id="logoutDropdown" onClick={handleLogout}>Logout</NavDropdown.Item>
                </NavDropdown>
              </>
            }
          </Nav>       
        </Container>
      </Navbar>
    </>
  )
}



export default NavBar