import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import { Nav } from 'react-bootstrap'
import { Container } from 'react-bootstrap'
import { NavDropdown } from 'react-bootstrap'
import RegisterPopup from './Register'
// import { Link } from 'react-router-dom'


const NavBar = () => {

  const [modalShow, setModalShow] = React.useState(false)


  return (
    <>
      <Navbar bg="dark" variant="dark" className="Navbar" fixed="top">
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
            <Nav.Link><i className="fas fa-toolbox"></i> My builds</Nav.Link>
          </Nav>
          <Nav className="d-flex">
            <NavDropdown title="Join us!" id="navbarScrollingDropdown">
              <NavDropdown.Item onClick={() => setModalShow(true)} >Register</NavDropdown.Item>
              <RegisterPopup
                show={modalShow}
                onHide={() => setModalShow(false)}
              />
              <NavDropdown.Item href="#">Login</NavDropdown.Item>
            </NavDropdown>
          </Nav>       
        </Container>
      </Navbar>
    </>
  )
}

export default NavBar