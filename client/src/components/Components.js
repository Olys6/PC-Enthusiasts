import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { ButtonGroup } from 'react-bootstrap'
import { DropdownButton } from 'react-bootstrap'
import { Dropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Components = () => {

  const [theComponents, setTheComponents] = useState([])
  
  // const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/components/')
        // console.log('data ->', data)
        setTheComponents(data)
      } catch (err) {
        console.log(err)
        // setHasError(true)
      }
    }
    getData()
  }, [])

  return (
    <div className="components">
      {/* <div className="componentsHero">
        <h2 className="heroTitle">Find the components to suit your desires!</h2>
      </div> */}
      <Card className="text-center componentsHero">
        <Card.Header className="heroTitle">Welcome to the components page</Card.Header>
        <Card.Body className="componentsTitleAndButton">
          <Card.Title className="heroTitle">Find the components to suit your desires!</Card.Title>
          <Button href="#cardsSection" variant="primary">Start</Button>
        </Card.Body>
      </Card>

      <section id="cardsSection" className="container">
        {theComponents.map(aComponent => {
          return (
            <Card key={aComponent.id} style={{ width: '18rem' }} className="componentCard">
              <Card.Img variant="top" src={aComponent.image} />
              <Card.Body className="cardBody">
                <Card.Title>{aComponent.title}</Card.Title>
                <Card.Text>
                  {aComponent.description}
                </Card.Text>
                <ButtonGroup aria-label="Basic example">
                  <Button variant="secondary"><Link  to={`/components/${aComponent.id}`}>More Info</Link></Button>
                  {/* <Button variant="secondary"> */}
                  <DropdownButton id="dropdown-basic-button" variant="secondary" title="➕">
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                  </DropdownButton>
                  {/* <i className="fas fa-plus"></i>
                  </Button> */}
                  <Button variant="secondary">Right</Button>
                </ButtonGroup>
                {/* <Button variant="primary"></Button> */}
              </Card.Body>
            </Card>
          )
        })}
      </section>
    </div>
  )
}

export default Components