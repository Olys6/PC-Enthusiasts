import React from 'react'
import Carousel from 'react-bootstrap/Carousel'
import Button from 'react-bootstrap/Button'

const Home = () => {

  
  return (
    <div className="HomePage">
      <Carousel fade>
        <Carousel.Item id="carousel1">
          <img
            className="d-block w-100"
            src="https://i.imgur.com/QCziFDa.png"
            alt="Asus PC setup"
          />
          <Carousel.Caption>
            <h3>Build the ultimate gaming rig!</h3>
            <p>Play more and win more with the newest geforce graphics cards from Nvidia</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 carouselimg"
            src="https://i.imgur.com/lOde0Lk.png"
            alt="PC setup dark and neon"
          />
          <Carousel.Caption>
            <h3>Make the most stylish setup</h3>
            <p>Make the best looking setup with rgb to fully immerse yourself when gaming or working</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 carouselimg"
            src="https://i.imgur.com/bBCKxXb.png"
            alt="PC setup light and colourful"
          />
          <Carousel.Caption>
            <h3>Impress your friends and coworkers with your computer</h3>
            <p>Get more done in less time by getting the latest and greatest components for your setup</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <div id="homeBoxBelowCarousel">
        <Button variant="dark" className="FindComponentBtn">Find Components</Button>
      </div>
    </div>
  )
  
  

}

export default Home