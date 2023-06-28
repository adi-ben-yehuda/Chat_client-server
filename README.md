# Server
In this repository, we have the server side (using NodeJS) of a chat that can work on applications in Android or websites in react.

## General Information

## User details:
The client requests the user information with /api/Users/:id where the id is the username. This request includes the token in the headers. The server will return the user information.

## Add contact:
The user can add a new contact by sending the data with /api/Chats with a post request to the server. This request includes the token in the headers and the username he wants to add in the body.

The server returns: 200 - If the user exists in the DB, the server will return the user information to the client with this status.
400 - if the user does not exist in the DB. 
405 - if the username is the same username of the logged in user. 
403 - if the username is empty. 
402 - if the username already exists in the user's contact list. 
401 - When an error occurs on the server.

## Get contacts:
For getting all the contacts of specific user, the client sends get request through /api/Chats to the server. This request includes the token in the headers. The server will return the chats list to the client.

## Chats:
The client sends get request through /api/Chats/:id/Messages/ when the id is the id of the chat, to the server. This request includes the token in the headers. The server will return all the messages in this chats to the client.


## Message:
In specific chat, the client sends post request through /api/Chats/:id/Messages/ when the id is the id of the chat, to the server. This request includes the token in the headers and the message in the body. The server will add this message to the DB and returns the message to the client.

## Notifications:
When a client sends a message to another client, the server push the notification that includes the name of the sender and the content of the message, to the relevant client using FireBase.


## Installation
Before installing this project, you need to install on your computer:
* Git
* Node.js
* MongoDB

Then open a terminal and clone the project to the folder that was created:
```
git clone https://github.com/adi-ben-yehuda/Server.git
```
Connect to the mongoDB.

After it, run in the command line:
```
npm i http
npm i socket.io
npm i mongodb
npm i cors
npm i express
npm i body-parser
npm i jsonwebtoken
npm i socket.io-client
npm i mongoose

node app.js
```




