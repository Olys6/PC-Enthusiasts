import React, { useState } from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas'
// import bulma from 'bulma'

const Footer = ({ ...props }) => {

  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  // add className="footer" if having issues with footer position

  return (
    <>
      <footer className="" id="Footer"> 
        <p>Website designed entirely by <a className="footerLinks" href="#" onClick={handleShow}>Oliver</a> with the help of <a className="footerLinks" href="https://react-bootstrap.netlify.app" target="_blank" rel="noreferrer">React bootstrap</a> and <a className="footerLinks" href="https://bulma.io" target="_blank" rel="noreferrer">Bulma</a></p>
        <Offcanvas show={show} onHide={handleClose} {...props} placement="bottom" backdrop={false} >
          <Offcanvas.Header closeButton id="footerOffcanvasX"> 
            {/* <Offcanvas.Title >Where you can find me:</Offcanvas.Title> */}
          </Offcanvas.Header>
          <Offcanvas.Body id="FooterOffcanvasBody">
            Here&apos;s my <a href="https://github.com/Olys6" className="FooterOffcanvasLinks" target="_blank" rel="noreferrer">github <i className="fab fa-github-square"></i></a> and <a href="https://www.linkedin.com/in/oliver-skjevesland/" target="_blank" rel="noreferrer" className="FooterOffcanvasLinks">linkedin <i className="fab fa-linkedin"></i></a> 
          </Offcanvas.Body>
        </Offcanvas>
      </footer>
      
    </>
  )
}

export default Footer