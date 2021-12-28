import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Form, Row, Col, ButtonGroup } from 'react-bootstrap'
// import Tabs from 'react-bootstrap/Tabs'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'
import { getUsernameFromLocalStorage } from './helpers/authentication'
import Cookies from 'js-cookie'
const csrftoken = Cookies.get('csrftoken')

const CreateBuild = () => {

  const localStorageUsername = getUsernameFromLocalStorage()
  const navigate = useNavigate()

  // const [processorId, setProcessorId] = useState(null)
  // console.log(processorId)

  // const [builds, setBuilds] = useState([])

  const [buildFormData, setBuildFormData] = useState({
    title: 'Insert title here',
    user: localStorageUsername,
    components: [],
  })

  const handleChange = (event) => {
    const newBuilFormData = { ...buildFormData, [event.target.name]: event.target.value }
    setBuildFormData(newBuilFormData)
    console.log(buildFormData)
  }

  const [userToken, setUserToken] = useState()

  useEffect(() => {
    const getTokenFromLocalStorage = () => {
      setUserToken(window.localStorage.getItem('token'))
    }
    getTokenFromLocalStorage()
  }, [])

  const handleNewBuild = async (event) => {
    event.preventDefault()
    
    const buildConfig = {
      method: 'post',
      url: '/api/builds/',
      headers: {
        Authorization: `Bearer ${userToken}`,
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': csrftoken,
      },
      data: buildFormData,
      // body: data,
    }
    const buildResponse = await axios(buildConfig)
    console.log('build data ->', buildResponse)
    navigate('/myBuilds')
  }

  const handleComponent = (event) => {
    // event.preventDefault()

    const formDataCopy = {
      ...buildFormData,
    }
    

    // console.log(formDataCopy)
    // console.log(event.target.value)
    const compId = parseInt(event.target.value)
    // console.log('component id', compId)
    // for (let i = 0; i < formDataCopy.components.length; i++) {
    //   if (formDataCopy.components[i] !== compId) {
    //     formDataCopy.components.push(compId)
    //     console.log('FORM DATA COPY ->', formDataCopy)
    

    //   }
    // }

    formDataCopy.components.push(compId)

    setBuildFormData(formDataCopy)
  }

  const [components, setComponents] = useState([])

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/components/')
        // console.log('data ->', data)
        setComponents(data)
      } catch (err) {
        console.log(err)
        // setHasError(true)
      }
    }
    getData()
  }, [])

  const processors = components.filter(component => {
    return component.component_type === 'Processor'
  })

  // console.log('processors ->', processors)

  const motherboards = components.filter(component => {
    return component.component_type === 'Motherboard'
  })

  const graphicsCards = components.filter(component => {
    return component.component_type === 'Graphics Card'
  })

  const cases = components.filter(component => {
    return component.component_type === 'Case'
  })

  const memory = components.filter(component => {
    return component.component_type === 'Memory'
  })

  const storages = components.filter(component => {
    return component.component_type === 'Storage'
  })

  const powerSupplies = components.filter(component => {
    return component.component_type === 'Power Supply'
  })

  

  return (
    <>
      <Form className="createBuildForm container" onSubmit={handleNewBuild}>
        <Form.Group as={Row} className="mb-3" >
          <Form.Label column className="">
            <h3><Form.Control value={buildFormData.title} name={'title'} onChange={handleChange} plaintext className="projectTitle"/></h3>
          </Form.Label>
        </Form.Group>
        <Form.Group as={Row} className="buildUsernameForm">
          <Form.Label column sm="4 ">
            Made by:
          </Form.Label>
          <Col sm="7">
            <Form.Control value={buildFormData.user} placeholder="username" plaintext readOnly/>
          </Col>
        </Form.Group>
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="1">
            <Accordion.Header>Processor</Accordion.Header>
            <Accordion.Body className="buildAccordionBody columns is-multiline">
              {/* {console.log('PROCESSOR ID ->', processor.id)} */}
              {processors.map(processor => (
                <Card key={processor.id} name={processor.title} className="componentCard column is-two-fifths">
                  <Card.Img variant="top" src={processor.image} />
                  <Card.Body className="cardBody"  >
                    <Card.Title>{processor.title}</Card.Title>
                    <ButtonGroup aria-label="Basic example">
                      <Button href={`/components/${processor.id}/`} variant="secondary" className="MoreInfoBtn">More Info</Button>
                      <Button value={processor.id} onClick={handleComponent}>Add</Button>
                      <Button href={processor.place_to_buy} variant="secondary"><i className="fab fa-amazon"></i></Button>
                    </ButtonGroup>
                  </Card.Body>
                </Card>
              ))}
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>Motherboard</Accordion.Header>
            <Accordion.Body className="buildAccordionBody columns is-multiline">
              {motherboards.map(motherboard => (
                <Card key={motherboard.id} name={motherboard.title} className="componentCard column is-two-fifths" >
                  <Card.Img variant="top" src={motherboard.image} />
                  <Card.Body className="cardBody"  >
                    <Card.Title>{motherboard.title}</Card.Title>
                    <ButtonGroup aria-label="Basic example">
                      <Button href={`/components/${motherboard.id}/`} variant="secondary" className="MoreInfoBtn">More Info</Button>
                      <Button value={motherboard.id} onClick={handleComponent}>Add</Button>
                      <Button href={motherboard.place_to_buy} variant="secondary"><i className="fab fa-amazon"></i></Button>
                    </ButtonGroup>
                  </Card.Body>
                </Card>
              ))}
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="3">
            <Accordion.Header>Graphics Card</Accordion.Header>
            <Accordion.Body className="buildAccordionBody columns is-multiline">
              {graphicsCards.map(graphicsCards => (
                <Card key={graphicsCards.id} name={graphicsCards.title} className="componentCard column is-two-fifths" >
                  <Card.Img variant="top" src={graphicsCards.image} />
                  <Card.Body className="cardBody"  >
                    <Card.Title>{graphicsCards.title}</Card.Title>
                    <ButtonGroup aria-label="Basic example">
                      <Button href={`/components/${graphicsCards.id}/`} variant="secondary" className="MoreInfoBtn">More Info</Button>
                      <Button value={graphicsCards.id} onClick={handleComponent}>Add</Button>
                      <Button href={graphicsCards.place_to_buy} variant="secondary"><i className="fab fa-amazon"></i></Button>
                    </ButtonGroup>
                  </Card.Body>
                </Card>
              ))}
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="4">
            <Accordion.Header>Case</Accordion.Header>
            <Accordion.Body className="buildAccordionBody columns is-multiline">
              {cases.map(Case => (
                <Card key={Case.id} name={Case.title} className="componentCard column is-two-fifths" >
                  <Card.Img variant="top" src={Case.image} />
                  <Card.Body className="cardBody"  >
                    <Card.Title>{Case.title}</Card.Title>
                    <ButtonGroup aria-label="Basic example">
                      <Button href={`/components/${Case.id}/`} variant="secondary" className="MoreInfoBtn">More Info</Button>
                      <Button value={Case.id} onClick={handleComponent}>Add</Button>
                      <Button href={Case.place_to_buy} variant="secondary"><i className="fab fa-amazon"></i></Button>
                    </ButtonGroup>
                  </Card.Body>
                </Card>
              ))}
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="5">
            <Accordion.Header>Memory</Accordion.Header>
            <Accordion.Body className="buildAccordionBody columns is-multiline">
              {memory.map(ram => (
                <Card key={ram.id} name={ram.title} className="componentCard column is-two-fifths" >
                  <Card.Img variant="top" src={ram.image} />
                  <Card.Body className="cardBody"  >
                    <Card.Title>{ram.title}</Card.Title>
                    <ButtonGroup aria-label="Basic example">
                      <Button href={`/components/${ram.id}/`} variant="secondary" className="MoreInfoBtn">More Info</Button>
                      <Button value={ram.id} onClick={handleComponent}>Add</Button>
                      <Button href={ram.place_to_buy} variant="secondary"><i className="fab fa-amazon"></i></Button>
                    </ButtonGroup>
                  </Card.Body>
                </Card>
              ))}
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="6">
            <Accordion.Header>Storage</Accordion.Header>
            <Accordion.Body className="buildAccordionBody columns is-multiline">
              {storages.map(storage => (
                <Card key={storage.id} name={storage.title} className="componentCard column is-two-fifths" >
                  <Card.Img variant="top" src={storage.image} />
                  <Card.Body className="cardBody"  >
                    <Card.Title>{storage.title}</Card.Title>
                    <ButtonGroup aria-label="Basic example">
                      <Button href={`/components/${storage.id}/`} variant="secondary" className="MoreInfoBtn">More Info</Button>
                      <Button value={storage.id} onClick={handleComponent}>Add</Button>
                      <Button href={storage.place_to_buy} variant="secondary"><i className="fab fa-amazon"></i></Button>
                    </ButtonGroup>
                  </Card.Body>
                </Card>
              ))}
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="7">
            <Accordion.Header>Power Supply</Accordion.Header>
            <Accordion.Body className="buildAccordionBody columns is-multiline">
              {powerSupplies.map(powerSupply => (
                <Card key={powerSupply.id} name={powerSupply.title} className="componentCard column is-two-fifths" >
                  <Card.Img variant="top" src={powerSupply.image} />
                  <Card.Body className="cardBody"  >
                    <Card.Title>{powerSupply.title}</Card.Title>
                    <ButtonGroup aria-label="Basic example">
                      <Button href={`/components/${powerSupply.id}/`} variant="secondary" className="MoreInfoBtn">More Info</Button>
                      <Button value={powerSupply.id} onClick={handleComponent}>Add</Button>
                      <Button href={powerSupply.place_to_buy} variant="secondary"><i className="fab fa-amazon"></i></Button>
                    </ButtonGroup>
                  </Card.Body>
                </Card>
              ))}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <Button type="submit" variant="success" className="buildIsFinished BtnEffect">Finish Build</Button>
      </Form>
    </>
  )
}

export default CreateBuild