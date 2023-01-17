# Travel Tracker by Rick Vermeil

## Goals and objectives:

- Use OOP to drive the design of the application and the code
- Work with an API to send and receive data
- Solidify the code review process
- Create a robust test suite that thoroughly tests all functionality of a client-side application

## Abstract:

This app is designed to be a travel booking portal that allows either a traveler or agent to login. The traveler dashboard is similar to many other booking sites with a trip request form that allows a user to request to book a trip as well as view all of their past, pending and upcoming trips. When an agent logs in, they can review all pending trips created by travelers and choose to approve or deny each request. It also features a search function that allows an agent to find a traveler by name and view all of their trips.

## Installation instructions:
- [Clone the repo found here](https://github.com/RickV85/Travel-Tracker-Mod-2-Final-Project)
- Navigate to the repository location
- Install npm packages by running `npm install` in your terminal
- [Clone the required API to create a local server here](https://github.com/RickV85/Travel-Tracker-API)
- Follow the set up instructions in the Travel-Tracker-API README file.
- Start the server in Travel-Tracker-API by running `npm start` in your terminal.
- Enter `npm start` in the terminal for your Travel Tracker. This compiles scripts with Webpack and serves the app.
- Navigate to (http://localhost:8080/) in your browser to interact with the app.

## Preview of the app:


### Context:
This app was created from ground up in one week as the final project of the 2nd quarter, or module, in Turing's Front-End Engineering program.

### Technologies Used
- Javascript
- HTML
- CSS 
- Mocha/Chai
- Webpack
- moment.js
- Web API's

### Contributors:
- Rick Vermeil (he/him)[LinkedIn]](https://www.linkedin.com/in/rick-vermeil-b93581159/) [GitHub](https://github.com/RickV85)


### Wins + Challenges:
Some challenges included: 
- Creating logic to filter data sets by date. Unfotunately, I wasted a lot of time before investigating moment.js which was easy to impliment and would have saved me a lot of time.
- I didn't complete all of the last iteration which would have added a feature to the agent portal traveler search to allow for modification of each trip for the searched user.

Some wins included:
- I spent a lot of time on error handling and made sure to alert the user in an attractive way when their request was bad, either due to an error on thier part or a server error and exactly what went wrong.
- I enjoyed designing the site without a comp to work off of. I was able to almost identically recreate my design on my app which is a win!

