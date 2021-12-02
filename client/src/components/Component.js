import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'

const Component = () => {

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
    <div className="componentPage">
      <h2 className="componentTitle">{component.title}</h2>
      <div className="w-100 componentImageAndDesc">
        <img className="componentImage" src={component.image}/>
        <div className="w-50">
          <h3>Component type: {component.component_type}</h3>
          <hr />
          <h3>{component.description}</h3>
        </div>
      </div>
      <div className="w-50 priceAndAdd ">
        <Button className=" w-50 price BtnEffect">Buy! {component.price} &#xa3;</Button>
        {/* <Button className="w-50 addToBuildBtn BtnEffect">Add to build</Button> */}
        <Dropdown className="w-50 componentDropdown">
          <div className="addToBuildBtn">
            <Dropdown.Toggle variant="primary" id="addToBuildBtn" className=" BtnEffect">
              Add to build
            </Dropdown.Toggle>
          </div>

          <Dropdown.Menu id="dropDownMenu">
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

    </div>
  )
}

export default Component