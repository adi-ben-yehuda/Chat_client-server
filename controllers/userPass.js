import userPassService from '../services/userPass.js'

const login = async (req, res) => {
  const token = await userPassService.isLogin(req.body.username, req.body.password);

  if (token !== null) {
    res.json({ token });
  } else {
    res.status(404).json({ error: 'Invalid username or password'});
  }
};

const getFCMToken = async (req, res) => {
  const token = await userPassService.getFCMToken(req.body.username, req.body.token);

  if (token !== null) {
    res.json({ ok: "ok" });
  } else {
    res.status(404).json({ error: 'error'});
  }
};

export {
  login,
  getFCMToken
};