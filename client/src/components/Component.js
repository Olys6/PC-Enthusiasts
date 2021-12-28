import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
// import Dropdown from 'react-bootstrap/Dropdown'
import Modal from 'react-bootstrap/Modal'

const Component = () => {

  const [smShow, setSmShow] = useState(false)

  const [component, setComponent] = useState([])

  const { pk } = useParams()

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`/api/components/${pk}/`)
        // console.log('data ->', data)
        setComponent(data)

      } catch (err) {
        console.log(err)
        // setHasError(true)
      }
    }
    getData()
  }, [pk])

  // console.log(component)

  return (
    <div name="top" id="componentPage">
      <h2 className="componentTitle">{component.title}</h2>
      <div className="w-100 componentImageAndDesc">
        <img className="componentImage" src={component.image}/>
        <div className="w-50">
          <h4>Component type: {component.component_type}</h4>
          <hr />
          <h4>{component.description}</h4>
          <p id="digitecCredit">Credit to <a href="https://www.digitec.ch/en">Digitec</a> for the description</p>
        </div>
      </div>
      <div className="w-100 priceAndAdd ">
        {/* <Button className="w-50 price BtnEffect">Buy! {component.price} &#xa3;</Button> */}
        <Button href={component.place_to_buy} target="_blank" className="w-50 price BtnEffect"><i className="fab fa-amazon"></i></Button>
        {/* <Button className="w-50 addToBuildBtn BtnEffect">Add to build</Button> */}
        {/* <Dropdown className="w-50 componentDropdown">
          <div className="addToBuildBtn w-100">
            <Dropdown.Toggle variant="primary" id="addToBuildBtn" className=" BtnEffect">
              Add to build
            </Dropdown.Toggle>
          </div>

          <Dropdown.Menu id="dropDownMenu">
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown> */}

        {/* href={`https://reddit.com/submit?url=${component.place_to_buy}&title=Add the ${component.title} component to your build!`} target="_blank" rel="noreferrer"></div> */}

        <Button className="w-50 shareButton BtnEffect" onClick={() => setSmShow(true)}>
          <i className="fas fa-share-square"></i>
        </Button>
        <Modal
          className="shareModal"
          size="sm"
          show={smShow}
          onHide={() => setSmShow(false)}
          centered
        >
          <Modal.Header closeButton className="shareModalHeader">
            <Modal.Title id="example-modal-sizes-title-sm">
              Share
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="shareBtnsModal w-100">
            <Button className="shareBtns BtnEffect" id="redditShareBtn" href={`https://reddit.com/submit?url=${component.place_to_buy}&title=Check out the ${component.title}!`} target="_blank" rel="noreferrer">
              <i className="fab fa-reddit-alien"></i>
            </Button>

            <Button className="shareBtns BtnEffect" id="twitterShareBtn" href={`https://twitter.com/share?url=${component.place_to_buy}&text=Check out the ${component.title}!`} target="_blank" rel="noreferrer">
              <i className="fab fa-twitter"></i>
            </Button>

            <Button className="shareBtns BtnEffect" id="facebookShareBtn" href={`https://www.facebook.com/sharer/sharer.php?u=${component.place_to_buy}`} target="_blank" rel="noreferrer">
              <p> <i className="fab fa-facebook-f"></i> </p>
            </Button>

            <Button variant="danger" className="shareBtns BtnEffect" id="emailShareBtn" href={`mailto:?subject=Check out the ${component.title}!&body=Click the link to check it out: ${component.place_to_buy}`}>
              <i className="fas fa-envelope"></i>
            </Button>
          </Modal.Body>
        </Modal>
      </div>

    </div>
  )
}

export default Component