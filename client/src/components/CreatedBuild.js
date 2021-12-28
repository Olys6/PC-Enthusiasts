import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { ButtonGroup } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { useNavigate } from 'react-router-dom'
// import Cookies from 'js-cookie'
// const csrftoken = Cookies.get('csrftoken')

const CreatedBuild = () => {

  // const [filteredComponents, setFilteredComponents] = useState()
  const [userToken, setUserToken] = useState()

  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const navigate = useNavigate()

  const [build, setBuild] = useState([])

  const { pk } = useParams()

  useEffect(() => {
    const getTokenFromLocalStorage = () => {
      setUserToken(window.localStorage.getItem('token'))
    }
    getTokenFromLocalStorage()
  }, [])

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(
          `/api/builds/${pk}/`,
          {
            headers: { Authorization: `Bearer ${userToken}` },
          }
        )
        // console.log('DATA ->', data)
        setBuild(data)
      } catch (err) {
        // console.log(err)
      }
    }
    getData()
  }, [userToken, pk])
  // console.log('build ->', build)
  // console.log('build components ->', build.components)

  const buildComponents = build.components

  const deleteBuild = () => {
    axios.delete(
      `/api/builds/${pk}/`,
      {
        headers: { Authorization: `Bearer ${userToken}` },
      }
    )
    setTimeout(function(){
      navigate('/myBuilds')
    }, 200)
  }

  // console.log('BUILD COPY ->', buildDataCopy)

  const removeComponent = (event) => {

    const componentIds = build.components.map(component => (
      component.id
    ))

    // console.log('COMPONENT IDS', componentIds)

    const FilteredComponents = componentIds.filter(component => {
      // console.log(component.id),
      // console.log(event.target.value),
      return component !== parseInt(event.target.value)
    })



    // console.log(FilteredComponents)

    const buildDataForm = {
      components: FilteredComponents,
      title: build.title,
      user: build.user,
    }

    // console.log('value ->', event.target.value)
    // console.log('build components ->', build.components)
    
    // setFilteredComponents(FilteredComponents)
    // console.log('filtered components ->', FilteredComponents.id)
    // console.log('FILTERED BUILD DATA FORM ->', buildDataForm)
    // console.log('NON FILTERED BUILD ->', build)

    axios.put(
      `/api/builds/${pk}/`,
      buildDataForm,
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    )
    // window.location.reload()
  }
  
  let totalPrice = 0

  return (
    <>
      <div className="container singleBuildContainer">
        <h2 className="buildTitle">{build.title}</h2>
        <div className="columns is-multiline buildCardsSection">
          {buildComponents && buildComponents.map(component => (
            totalPrice += component.price,
            <Card key={component.id} name={component.title} className="componentCard column is-one-quarter">
              <Card.Img variant="top" src={component.image} />
              <Card.Body className="cardBody"  >
                <Card.Title>{component.title}</Card.Title>
                <ButtonGroup aria-label="Basic example">
                  <Button href={`/components/${component.id}/`} variant="secondary" className="MoreInfoBtn">More Info</Button>
                  <Button variant="danger" value={component.id} onClick={removeComponent}>Remove</Button>
                  <Button href={component.place_to_buy} variant="secondary"><i className="fab fa-amazon"></i></Button>
                </ButtonGroup>
              </Card.Body>
            </Card>
          ))}
        </div>
        <h2>Total price: <span className="totalPrice">{totalPrice}£</span></h2>
        <div className="buildButtons">
          
          <Button variant="danger" className="buildButton" onClick={handleShow}>Delete Build</Button>
          {/* <Button variant="success" className="buildButton">Update build</Button>  */}
        
        </div>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          centered
        >
          <Modal.Header className="areYouSureHeader" closeButton>
            <Modal.Title>Are you sure?</Modal.Title>
          </Modal.Header>
          <Modal.Footer className="areYouSureFooter">
            <Button variant="primary" onClick={handleClose}>No</Button>
            <Button variant="danger" onClick={deleteBuild}>Yes delete {build.title}</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  )
}

export default CreatedBuild