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



## 3rd - 4th day: Progressing

When I finished the homepage, I started working on the components page and register/login JS components. First, I made a components page to display all the components in the backend. I had to make an axios get request to the API I made to pull everything in the components. To display everything at once I used a ‘.map’ to map everything into individual cards using the bootstrap framework and using the Bulma framework for the columns. Second, I made a modal for the register and login by making a JS component for them and setting the modal to true/false when clicking register or login. I also made a basic footer with vanilla CSS but later on used Bulma instead.

[code snippet of the components page]

## 5th day: 
I spent the day making a single component page where you can find more information about a component of your choice. This page includes an amazon link to the component as the API includes an amazon link to each component as well as a share button that work using basic HTML and a Modal from react bootstrap. Then I worked on the builds page where you can create builds by sending a put request to the API. 



## 5th - 9th day: Challenge

I spent a lot of time trying to get components added to the builds, I initially struggled finding how to do it. I decided to add some accordions from bootstrap and piled them up on top of one another. Each accordion has an array of component cards that are being filtered from the axios request so it only shows the components we want and there’s a button that allows you to add the component to your build. This button makes a put request to the backend to add said component. You’re now also able to delete builds, this works by sending a delete request to the API. Each build gives a total price by just adding the price of all components together.



[code snippet of the createdBuild component]

## Wins & Challenge

### Wins

This app was a big accomplishment for me because I got to understand everything I used previously a lot better thanks to repetition.
The fact that I managed to get the filter for the components to work on the first try.


### Challenges
 Getting components into the build and getting it to work.


## Future Improvements

I would’ve added an accordion in the build page so you could add more components to a build that already exists.
I would have liked to style the website a bit more by improving the colours and the user interface.

## Key Learning

This app made me so much more confident, it greatly improved my understanding of everything I learnt during the course. To be more specific, I understand how local storage, user authentication and backend works now. I now also feel very comfortable with React and understand a lot more about Python/Django.
