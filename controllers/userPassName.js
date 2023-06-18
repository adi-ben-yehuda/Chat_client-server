import e from 'express';
import userService from '../services/userPassName.js'


const createUser = async (req, res) => {
    const exist = await userService.isExist(req.body.username);
    const error = userService.isValidUser(
      req.body.username,
      req.body.password,
      req.body.displayName,
      req.body.profilePic
    );
  
    if (error === '' && !exist) {
      const newUser = await userService.createUser(
        req.body.username,
        req.body.password,
        req.body.displayName,
        req.body.profilePic
      );
      res.json(newUser);
    } else if (exist) {
      res.status(409).json({ error: 'Username already exists' });
    } else {
      res.status(400).json({ error });
    }
  };

export {
    createUser
};