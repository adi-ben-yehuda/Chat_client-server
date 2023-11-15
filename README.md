# Chat

In this repository, there is a chat website that contains a server-side using Node JS and a client-side using React. The server side is suitable for Android apps like [this](https://github.com/adi-ben-yehuda/android_chat] or React websites. 

## General Information

## Server: 
<ins>**User details:**</ins>

The client requests the user information with /api/Users/:id where the id is the username. This request includes the token in the headers. The server will return the user information.

<ins>**Add contact:**</ins>

The user can add a new contact by sending the data with /api/Chats with a post request to the server. This request includes the token in the headers and the username he wants to add in the body.

The server returns: 
- 200 - If the user exists in the DB, the server will return the user information to the client with this status.
- 400 - if the user does not exist in the DB. 
- 405 - if the username is the same username of the logged in user. 
- 403 - if the username is empty. 
- 402 - if the username already exists in the user's contact list. 
- 401 - When an error occurs on the server.

<ins>**Get contacts:**</ins>

For getting all the contacts of specific user, the client sends get request through /api/Chats to the server. This request includes the token in the headers. The server will return the chats list to the client.

<ins>**Chats:**</ins>

The client sends get request through /api/Chats/:id/Messages/ when the id is the id of the chat, to the server. This request includes the token in the headers. The server will return all the messages in this chats to the client.

<ins>**Message:**</ins>

In specific chat, the client sends post request through /api/Chats/:id/Messages/ when the id is the id of the chat, to the server. This request includes the token in the headers and the message in the body. The server will add this message to the DB and returns the message to the client.

<ins>**Notifications:**</ins>

When a client sends a message to another client, the server push the notification that includes the name of the sender and the content of the message, to the relevant client using FireBase.

## Client: 
A simple login screen will be displayed on the main page. The user must enter a username and password or go to the registration screen.
On the registration screen, there is a validation of the input fields:
  -  All fields are mandatory.
   - The password must have at least 8 characters.
   - The image must have a suffix of .png, .jpg, or .jpeg.
   - The username must be unique.
    
![image](https://github.com/adi-ben-yehuda/server_NodeJS/assets/117977429/b32771bd-58a0-4798-b5ea-c49794f65bc7)

Once the user is registered, the client sends the data with /api/Users with a post request to the server. If the data is valid, it will be saved in the database and return 200 to the client. If the user already exists, the server will return a 409.

After registration, the user needs to log in to the application by entering his username and password. 
The client sends the data with /api/Tokens with a post request to the server. The server checks if the user exists in the DB. 
If so, the server will generate a token for the user and return it with a status of 200. The client will navigate the user to the chat screen.
If the details are incorrect, the server will return a 404. The client will display a correct error message on the screen.

![image](https://github.com/adi-ben-yehuda/server_NodeJS/assets/117977429/4689018e-6ffc-42bb-bfde-11e3636ce604)

On the chat screen, there are several things:

<ins>**User details:**</ins>

On the top left are the details of the user connected to the application. The client requests the user information with /api/Users/:id where the id is the username. This request includes the token in the headers. The server will return the user information.

<ins>**Add contact:**</ins>

The user can add new contact by pressing on add contact icon and input the username of the contact he wants to add. 
The client sends the data with /api/Chats with a post request to the server. This request includes the token in the headers and the username he wants to add in the body. 

<ins>**Get contacts:**</ins>

The contacts of the user will appear on the left part of the screen, showing the picture and name of each contact.
This happens because the client sends get request through /api/Chats to the server. This request includes the token in the headers. 
The server will return the chats list to the client. 

<ins>**Chats:**</ins>

Clicking on a contact will open the conversation messages between that contact and the user. The image and name of the contact will also appear on the top right side of the screen.
This happens becaues the client sends get request through /api/Chats/:id/Messages/ when the id is the id of the chat, to the server. This request includes the token in the headers. 
The server will return all the messages in this chats to the client. 

<ins>**Message:**</ins>

In specific chat, the user can send a message to the other user in the chat. After the user inputs the message and click on send, the client sends post request through /api/Chats/:id/Messages/ when the id is the id of the chat, to the server. This request includes the token in the headers and the message in the body. 
The server will add this message to the DB and returns 200 to the client. 

In addition, the user can log out of the chat by pressing the "logout" button on the top right corner of the screen. Note that the conversations and contacts of the user will not be saved in case of a disconnection or reconnection.

![image](https://github.com/adi-ben-yehuda/server_NodeJS/assets/117977429/18f173c7-9b33-4e25-b1c2-550b3c4210a0)

## Installation
Before installing this project, you need to install on your computer:
* Git
* Node.js
* MongoDB
* React

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
Write in the url of the website:
```
http://localhost:5000/
```



