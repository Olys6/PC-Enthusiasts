import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Button from 'react-bootstrap/Button'


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
      <div className="w-100 componentImageAndDesc">
        <img className="componentImage" src={component.image}/>
        <div className="w-50">
          <h4>{component.description}</h4>
        </div>
      </div>
      <div className="w-50 priceAndAdd ">
        <div className=" w-50 price BtnEffect">Buy! {component.price} &#xa3;</div>
        <Button className="w-50 addToBuildBtn BtnEffect">Add to build</Button>
      </div>
    </div>
  )
}

export default Component