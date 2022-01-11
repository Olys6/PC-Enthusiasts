# PC-Enthusiasts

## The Brief

<ul>
<li>Build a full-stack application</li>
<li>Use a Django API with the Django REST Framework</li>
<li>Utilise the API with a built frontend using React</li>
<li>Implement wireframes and diagrams</li>
<li>Be deployed online</li>
</ul>

## Overview

PC Enthusiasts is an app that I had a week to work on and it allows you to build your computer! It shows you the components available to use on your own “build” which acts as a folder to dump all of your computer parts into. I took inspiration from the website <a href="https://pcpartpicker.com">part picker</a>. 

## Technologies used

<div style="display: flex; flex-direction: row; gap: 1.5rem; margin-bottom: 10px;">
  <img style="width: 100px;" src="https://i.imgur.com/tlQzHt6.png">
  <img style="width: 70px;" src="https://i.imgur.com/BYUqdTS.png">
  <img style="width: 100px;" src="https://i.imgur.com/k9De3HS.png">
  <img style="width: 100px;" src="https://i.imgur.com/0O17BWj.png">
  <img style="width: 200px;" src="https://i.imgur.com/C9s6ueO.png">
  <img style="width: 150px;" src="https://i.imgur.com/st6ajnt.jpg">
</div> 
      


## 1st day: Drawing board

I decided to make an app off a hobby I have which is PC building! I started by making a diagram of how the backend is going to work. Once I finished with the diagram, I started making a wireframe of the website.






### Diagram:

<img src="https://i.imgur.com/5LYWudn.png">

### Wireframe: 

<img src="https://i.imgur.com/aZc1DEB.png">

After all the planning was done using figma and Quickdatabasediagrams, I immediately started working on the structure of the backend and I managed to finish it on the first day I started on the app.
2nd day: Commence front-end!

I began by making the homepage and playing around with react-bootstrap as I haven’t used it before. I wanted to find a neat tool on bootstrap to start familiarising myself with the framework. I figured getting a carousel going would be a good start! Got it working almost perfectly first try, I then proceeded to make the navbar and the rest of the homepage.

<img src="https://i.imgur.com/JhqkLs8.gif">



## 3rd - 4th day: Progressing

When I finished the homepage, I started working on the components page and register/login JS components. First, I made a components page to display all the components in the backend. I had to make an axios get request to the API I made to pull everything in the components. To display everything at once I used a ‘.map’ to map everything into individual cards using the bootstrap framework and using the Bulma framework for the columns. Second, I made a modal for the register and login by making a JS component for them and setting the modal to true/false when clicking register or login. I also made a basic footer with vanilla CSS but later on used Bulma instead.

<img src="https://i.imgur.com/kSEy0Bd.png">

    useEffect(() => {
      const getData = async () => {
        try {
          const { data } = await axios.get('/api/components/')
          setTheComponents(data)
        } catch (err) {
          console.log(err)
        }
      }
      getData()
    }, [])

## 5th day: 
I spent the day making a single component page where you can find more information about a component of your choice. This page includes an amazon link to the component as the API includes an amazon link to each component as well as a share button that work using basic HTML and a Modal from react bootstrap. Then I worked on the builds page where you can create builds by sending a put request to the API. 

<img src="https://i.imgur.com/JYDAp0H.png">

<img src="https://i.imgur.com/fsV8L54.png">

## 6th - 9th day: Challenge

I spent a lot of time trying to get components added to the builds, I initially struggled finding how to do it. I decided to add some accordions from bootstrap and piled them up on top of one another. Each accordion has an array of component cards that are being filtered from the axios request so it only shows the components we want and there’s a button that allows you to add the component to your build. This button makes a put request to the backend to add said component. You’re now also able to delete builds, this works by sending a delete request to the API. Each build gives a total price by just adding the price of all components together.

<img src="https://i.imgur.com/ALXaMc3.png">



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



## Wins & Challenge

### Wins

<ul>
<li>This app was a big accomplishment for me because I got to understand everything I used previously a lot better thanks to repetition.</li>
<li>The fact that I managed to get the filter for the components to work on the first try.</li>
</ul>

### Challenges
<ul>
 <li>Getting components into the build and getting it to work.</li>
</ul>

## Future Improvements

<ul>
<li>I would’ve added an accordion in the build page so you could add more components to a build that already exists.</li>
<li>I would have liked to style the website a bit more by improving the colours and the user interface.</li>
</ul>

## Key Learning

This app made me so much more confident, it greatly improved my understanding of everything I learnt during the course. To be more specific, I understand how local storage, user authentication and backend works now. I now also feel very comfortable with React and understand a lot more about Python/Django.
