import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Form, Row, Col } from 'react-bootstrap'
import Accordion from 'react-bootstrap/Accordion'
import { getUsernameFromLocalStorage } from './helpers/authentication'
import Cookies from 'js-cookie'
const csrftoken = Cookies.get('csrftoken')

const CreateBuild = () => {

  const localStorageUsername = getUsernameFromLocalStorage()

  const [processorId, setProcessorId] = useState(null)
  console.log(processorId)

  const [builds, setBuilds] = useState([])

  const [buildFormData, setBuildFormData] = useState({
    title: '',
    username: localStorageUsername,
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

  const handleNewBuild = async event => {
    event.preventDefault()
    
    const buildConfig = {
      method: 'post',
      url: '/api/builds',
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

  }

  const handleComponent = (event) => {
    // event.preventDefault()
    const compId = parseInt(event.target.value)
    setProcessorId(compId)
    const buildComp = [...builds, compId]
    console.log('build component ->', buildComp)
    setBuilds(buildComp)
    const newCompData = { ...buildFormData, [event.target.name]: buildComp }
    setBuildFormData(newCompData)
    // const component = event.target
    console.log('build form data ->', buildFormData)
    // console.log('component', component)
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

  // console.log(processors)

  

  return (
    <>
      <Form className="createBuildForm container">
        <Form.Group as={Row} className="mb-3" onSubmit={handleNewBuild}>
          <Form.Label column className="">
            <h3><Form.Control value={buildFormData.title} onChange={handleChange} plaintext className="projectTitle"/></h3>
          </Form.Label>
        </Form.Group>
        <Form.Group as={Row} className="buildUsernameForm">
          <Form.Label column sm="1">
            Username
          </Form.Label>
          <Col sm="7">
            <Form.Control value={buildFormData.username} placeholder="username" readOnly/>
          </Col>
        </Form.Group>

        <Accordion className="accordion">
          <Form.Select className="formSelectComp" name="components" onChange={handleComponent}>
            <option>Pick a processor</option>
            {processors.map(processor => (
              <option key={processor.id} value={processor.id} >
                {processor.title}
              </option>
            ))}
          </Form.Select>
          <Accordion.Item className="accordionComp">
            <Accordion.Header>Processor Info</Accordion.Header>
            <Accordion.Body>
              {/* Hello {components[buildFormData.processor]} */}
              {builds.length > 0 ? 
                <p>{processors[1].description}</p>
                :
                <p></p>
              }
            </Accordion.Body>
          </Accordion.Item>
        </ Accordion>
        <Accordion className="accordion">
          {/* <Form.Select className="formSelectComp"> */}
          {/* {processors.map(processor => (
              <>
                <option key={} value={processor.id}>{processor.title}</option>
              </>
            ))} */}
          {/* </Form.Select> */}
          <Accordion.Item className="accordionComp">
            <Accordion.Header>Motherboard Info</Accordion.Header>
            <Accordion.Body>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
              commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
              velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
              est laborum.
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>        
      </Form>
    </>
  )
}

export default CreateBuild