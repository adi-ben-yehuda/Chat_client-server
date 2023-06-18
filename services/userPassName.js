import userPassName from '../models/userPassName.js';

const checkPassword = (password) => {
  if (/^[A-Za-z0-9]*$/.test(password) === true && password.length >= 8) {
    return true;
  }
  return false;
};

const checkProfilePic = (profilePic) => {
  var valid = false;


  if (profilePic.includes('png') || profilePic.includes('jpg') || profilePic.includes('jpeg')) {
    valid = true;
  }

  // Check if the image doesn't end with png, jpg or jpeg
  if (!(profilePic && !valid)) {
    return false;
  }

  return true;
};

const isValidUser = (username, password, displayName, profilePic) => {
  const errorList = [];

  if (username === '') {
    errorList.push('username');
  }
  if (!checkPassword(password)) {
    errorList.push('password');
  }
  if (displayName === '') {
    errorList.push('display name');
  }
  if (checkProfilePic(profilePic)) {
    errorList.push('image');
  }

  return errorList.join(', ');
};

const isExist = async (username) => {
  try {
    const doc = await userPassName.findOne({ username });
    if (doc) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
};

const createUser = async (username, password, displayName, profilePic) => {
  const user = await userPassName.create({
    username: username, password: password,
    displayName: displayName, profilePic: profilePic
  });
};

export default {
  createUser,
  isValidUser,
  isExist
};
