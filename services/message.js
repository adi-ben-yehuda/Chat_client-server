import jwt from 'jsonwebtoken'
import Message from '../models/message.js';
import Chat from '../models/chat.js';
import UserPassName from '../models/userPassName.js';
import { dictionary, sendPushNotification }  from './notifications.js';

const addMessage = async (id, content, authorization) => {
  // Check if authorization header exists
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return null;
  }

  var token;
  // Extract the token from the header
  try {
    token = JSON.parse(authorization.split(' ')[1]).token;
  } catch(err) {
    token = authorization.split(' ')[1]; //androaid
  }

  try {
    // Verify the token is valid
    const decoded = jwt.verify(token, process.env.KEY);
    // Access the user ID from the decoded token
    const senderId = decoded.userId;

    const chat = await Chat.findOne({ id });

    // const senderId = chat.userId;
    const senderUser = await UserPassName.findOne({ _id: senderId });
    const count = await Message.countDocuments();
    const sender = { 'username': senderUser.username }
    const msg = {
      id: count+1, 
      sender: sender,
      content: content
    }
    
    await Message.create(msg);
    chat.messages.push(msg);

    const currentDate = new Date();  
    msg.created = currentDate.toISOString();

    // Save the updated chat document
    await chat.save();

    const foundUser = chat.users.find(user => user.username !== sender.username);
    if (dictionary[foundUser.username] != null) {
      sendPushNotification(dictionary[foundUser.username], senderUser.displayName, msg.content);
    }

    return msg;
  } catch (err) {
    return null;
  }
};

const getMessage = async (id, authorization) => {
  // Check if authorization header exists
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return null;
  }

  var token;
  // Extract the token from the header
  try {
    token = JSON.parse(authorization.split(' ')[1]).token;
  } catch(err) {
    token = authorization.split(' ')[1]; //androaid
  }

  try {
    // Verify the token is valid
    jwt.verify(token, process.env.KEY);
    const chat = await Chat.findOne({ id });

    return chat.messages;
  } catch (err) {
    return "1";
  }
};

export default {
  addMessage,
  getMessage
};
