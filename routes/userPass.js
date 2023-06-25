import express from 'express'
var router = express.Router();
import { login, getFCMToken } from '../controllers/userPass.js'

router.route('/Tokens').post((req, res) => {
  login(req, res);
});

router.route('/FCMTokens').post((req, res) => {
  getFCMToken(req, res);
});


export default router;