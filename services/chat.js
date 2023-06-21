import jwt from 'jsonwebtoken';
import Chat from '../models/chat.js';
import UserPassName from '../models/userPassName.js';

const createChat = async (username, authorization) => {

  if (username === '') {
    return "empty";
  }

  // Check if authorization header exists and starts with 'Bearer '
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return null;
  }

  var token;
  // Extract the token from the header
  try {
    token = JSON.parse(authorization.split(' ')[1]).token;
  } catch (err) {
    token = authorization.split(' ')[1]; //androaid
  }

  try {
    // Verify the token is valid
    const decoded = jwt.verify(token, process.env.KEY);

    // Access the user ID from the decoded token
    const userId = decoded.userId;
    const profile = await UserPassName.findOne({ _id: userId });
    const user = await UserPassName.findOne({ username });

    if (!user) {
      return "notRegister";
    }

    if (profile.username === username) {
      return "me";
    }

    const contactExists = profile.contacts.some((contact) => contact.username === username);
    if (contactExists) {
      return "exist"
    }
    const contact = {
      username: username
    }
    profile.contacts.push(contact);
    await profile.save()


    const user1Chats = await Chat.find({
      users: {
        $elemMatch: {
          username: profile.username
        }
      }
    });

    const user2Chats = user1Chats.filter(chat => {
      return chat.users.some(user => user.username === username);
    });

    if (user2Chats.length !== 0) {
      console.log(user2Chats[0].id);
      const userResult = {
        id : user2Chats[0].id,
        user: {
          username : user.username,
          displayName : user.displayName,
          profilePic : user.profilePic
        }
      }
      console.log(userResult);
      return userResult;
    }


    const count = await Chat.countDocuments({});
    const userA = { username: username, displayName: user.displayName, profilePic: user.profilePic };
    const userB = { username: profile.username, displayName: profile.displayName, profilePic: profile.profilePic };

    const chat = await Chat.create({
      id: count + 1, users: [userA, userB], messages: [], userId: userId
    });

    const userResult = {
      id : chat.id,
      user: {
        username : user.username,
        displayName : user.displayName,
        profilePic : user.profilePic
      }
    }

    return userResult;
  } catch (err) {
    return null;
  }
};

const createContacts = async (authorization) => {
  // Check if authorization header exists
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return null;
  }

  var token;
  // Extract the token from the header
  try {
    token = JSON.parse(authorization.split(' ')[1]).token;
  } catch (err) {
    token = authorization.split(' ')[1]; //androaid
  }

  try {
    // Verify the token is valid
    const decoded = jwt.verify(token, process.env.KEY);
    // Access the user ID from the decoded token
    const userId = decoded.userId;

    const contactList = [];

    // Retrieve all chats
    const myProfile = await UserPassName.findOne({ _id: userId });

    for (const contact of myProfile.contacts) {
      const contactUsername = contact.username;

      // Find all chats where the contact's username exists in the users list
      const chats = await Chat.find({
        users: {
          $elemMatch: { username: contactUsername }
        }
      }).exec();

      for (const chat of chats) {
        const users = chat.users;
        const myProfileUsername = myProfile.username;

        // Check if the chat includes both the contact and the current user
        const includesBoth = users.some(user => user.username === contactUsername) && users.some(user => user.username === myProfileUsername);

        if (includesBoth) {
          const user = await UserPassName.findOne({ username: contactUsername });

          if (user) {
            const tempUser = {
              username: user.username,
              displayName: user.displayName,
              profilePic: user.profilePic
            }

            let lastMessage = null;
            const messages = chat.messages;

            if (messages.length > 0) {
              lastMessage = {
                id: messages[messages.length - 1].id,
                created: messages[messages.length - 1].created,
                content: messages[messages.length - 1].content,
              };
            } else {
              lastMessage = null;
            }

            const contactData = {
              id: chat.id,
              user: tempUser,
              lastMessage: lastMessage
            };

            contactList.push(contactData);
          }
        }
      }
    }

    return contactList;
  } catch (err) {
    return null;
  }
}


const getChat = async (id, authorization) => {
  // Check if authorization header exists
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return null;
  }

  var token;
  // Extract the token from the header
  try {
    token = JSON.parse(authorization.split(' ')[1]).token;
  } catch (err) {
    token = authorization.split(' ')[1]; //androaid
  }
  try {
    const chat = await Chat.findOne({ id: id }).exec();
    return chat;
  } catch (error) {
    return "400"
  }
}



const deleteC = async (id, authorization) => {

  // Check if authorization header exists
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return null;
  }

  var token;
  // Extract the token from the header
  try {
    token = JSON.parse(authorization.split(' ')[1]).token;
  } catch (err) {
    token = authorization.split(' ')[1]; //androaid
  }
  try {
    const deletedChat = await Chat.findOneAndDelete({ id: id }).exec();
    if (deletedChat) {
      return "200"

    } else {
      return "404"
    }
  } catch (error) {
    return "400"
  }
};

export default {
  createChat,
  createContacts,
  getChat,
  deleteC
};
