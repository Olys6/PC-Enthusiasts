import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { Form } from 'react-bootstrap'
import { Row } from 'react-bootstrap'
import { Col } from 'react-bootstrap'

const RegisterPopup = (props) => {
  
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Form className="form">
        <Form.Group as={Row} className="mb-3" controlId="formBasicEmail">
          <Form.Label column sm="2">
            Username
          </Form.Label>
          <Col sm="10">
            <Form.Control placeholder="Username"/>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formBasicPassword">
          <Form.Label column sm="2">
            Password
          </Form.Label>
          <Col sm="10">
            <Form.Control placeholder="Password"/>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formBasicPassword">
          <Form.Label column sm="2">
            Password Confirmation
          </Form.Label>
          <Col sm="10">
            <Form.Control placeholder="Password Confirmation"/>
          </Col>
        </Form.Group>
        <Button variant="primary" type="submit" className="formBtn">
          Register
        </Button>
      </Form>
    </Modal>
  )
}

export default RegisterPopup