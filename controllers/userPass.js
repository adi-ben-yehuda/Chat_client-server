import userPassService from '../services/userPass.js'

const login = async (req, res) => {
  const token = await userPassService.isLogin(req.body.username, req.body.password);

  if (token !== null) {
    res.json({ token });
  } else {
    res.status(404).json({ error: 'Invalid username or password'});
  }
};

export {
  login
};