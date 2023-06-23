import userPassName from '../models/userPassName.js';
import jwt from 'jsonwebtoken';
import { dictionary } from './notifications.js';


const isLogin = async (username, password) => {
  // Validate the username and password against the User model
  const user = await userPassName.findOne({ username, password });
  if (!user) {
    return null;
  }

  // Generate a token
  const token = jwt.sign({ userId: user._id }, process.env.KEY, { expiresIn: '1h' });

  // Add the username and his token to the dictionary
  dictionary.username = token;
  console.log(dictionary);

  return token;
};

export default {
  isLogin
};
