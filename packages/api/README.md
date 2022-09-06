# Backend Package (backend)

An express api to run locally on your machine

## Getting started
- I really like VSCode for Typescript stuff. I highly recommend using it
- Make sure you have npm installed and in your path (run `npm` and see if you get an angry message about the command not being found) 
- In this directory, run `npm i`

## Running the server

There are a few ways to do this, but I like to pop open two terminals in the api package, then:
- run `npm run build:watch` in one of them to watch for changes to the Typescript files to re-compile on the fly
- run `npm run start:watch` to start the server and listen for requests 
- head to localhost:7001/test in the browser or make a request (on like postman or something) to verify it is running
