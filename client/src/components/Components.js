import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { ButtonGroup } from 'react-bootstrap'
// import { DropdownButton } from 'react-bootstrap'
// import { Dropdown } from 'react-bootstrap'
// import { Link } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import { getPayload } from './helpers/authentication'
import { Col } from 'react-bootstrap'

const Components = () => {

  const [theComponents, setTheComponents] = useState([])
  
  const [componentTypeOption, setComponentTypeOption] = useState('all')
  const [search, setSearch] = useState('')

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

  const handleComponentOption = (event) => {
    setComponentTypeOption(event.target.value)
  }

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const userIsAuthenticated = () => {
    const payload = getPayload()
    // console.log('payload ->', payload)
    if (!payload) return false
    // const now = Math.round(Date.now() / 1000)
    // return now < payload.exp
    return true
  }

  const filterComponents = () => {
    const regexSearch = new RegExp(search, 'ig')
    return theComponents.filter(component => {
      return regexSearch.exec(component.title) && (component.component_type === componentTypeOption || componentTypeOption === 'all')
    })
  }
  

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
        <div className="filterBar">
          <input type="text" placeholder="Search" onChange={handleSearch} className="componentsSearch"/>
          <Form.Select aria-label="Default select example" onChange={handleComponentOption} className="componentsFilter">
            <option value="all">All Components</option>
            <option value="Processor">Processors</option>
            <option value="Motherboard">Motherboards</option>
            <option value="Graphics Card">Graphics Cards</option>
            <option value="Case">Cases</option>
            <option value="Memory">Memory</option>
            <option value="Storage">Storage</option>
            <option value="Power Supply">Power Supplies</option>
          </Form.Select>
          {/* <select name="option" onChange={handleComponentOption}>
            <option value="">All Components</option>
            <option value="Processor">Processors</option>
            <option value="GPU">GPU</option>
          </select> */}
        </div>
        <div className="columns is-multiline">
          {filterComponents().map(aComponent => {
            return (
              <Col key={aComponent.id} className="column is-one-third">
                <Card  style={{ width: '18rem' }} className="componentCard">
                  <Card.Img variant="top" src={aComponent.image} />
                  <Card.Body className="cardBody">
                    <Card.Title>{aComponent.title}</Card.Title>
                    {/* <Card.Text>
                      {aComponent.description}
                    </Card.Text> */}
                    <ButtonGroup aria-label="Basic example">
                      <Button href={`/components/${aComponent.id}/`} variant="secondary" className="MoreInfoBtn">More Info</Button>
                      {/* <Button variant="secondary"> */}
                      {!userIsAuthenticated() ?
                        <>
                        </>
                        :
                        <>
                          {/* <DropdownButton id="cardDropdown" variant="secondary" title={<i className="fas fa-plus"></i>}>
                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                          </DropdownButton> */}
                        </>
                      }
                      {/* <i className="fas fa-plus"></i>
                      </Button> */}
                      <Button href={aComponent.place_to_buy} variant="secondary"><i className="fab fa-amazon"></i></Button>
                    </ButtonGroup>
                    {/* <Button variant="primary"></Button> */}
                  </Card.Body>
                </Card>
              </Col>
            )
          })}
        </div>
      </section>
    </div>
  )
}

export default Components