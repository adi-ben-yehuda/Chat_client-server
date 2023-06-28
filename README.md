# Server
In this repository we have the server side (using NodeJS) of a chat application in Android.


## User details:
On the top left are the details of the user connected to the application. The client requests the user information with /api/Users/:id where the id is the username. This request includes the token in the headers. The server will return the user information.

## Add contact:
The user can add new contact by pressing on add contact icon and input the username of the contact he wants to add. The client sends the data with /api/Chats with a post request to the server. This request includes the token in the headers and the username he wants to add in the body.

The server returns: 200 - If the user exists in the DB, the server will return it with the user information to the client. The client will display this data on the screen. 400 - if the user does not exist in the DB. 405 - if the username is the same username of the logged in user. 403 - if the username is empty. 402 - if the username already exists in the user's contact list. 401 - When an error occurs on the server.

## Get contacts:
The contacts of the user will appear on the left part of the screen, showing the picture and name of each contact. This happens because the client sends get request through /api/Chats to the server. This request includes the token in the headers. The server will return the chats list to the client.

## Chats:
Clicking on a contact will open the conversation messages between that contact and the user. The image and name of the contact will also appear on the top right side of the screen. This happens becaues the client sends get request through /api/Chats/:id/Messages/ when the id is the id of the chat, to the server. This request includes the token in the headers. The server will return all the messages in this chats to the client.


## Message:
In specific chat, the user can send a message to the other user in the chat. After the user inputs the message and click on send, the client sends post request through /api/Chats/:id/Messages/ when the id is the id of the chat, to the server. This request includes the token in the headers and the message in the body. The server will add this message to the DB and returns the message to the client.

## Notifications:
When a client sends a message to another client, the server push the notification that includes the name of the sender and the content of the message, to the relevant client using FireBase.


## Installation
Before installing this project, you need to install on your computer:
* Git
* Node.js
* MongoDB

Then open a terminal and clone the project to the folder that was created:
```
git clone https://github.com/ShaharMosh/Web_1b.git](https://github.com/adi-ben-yehuda/server_NodeJS.git
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
npm i firebase-admin
npm i fcm-notification

node app.js
```




