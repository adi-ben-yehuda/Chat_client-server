import express from 'express'
var router = express.Router();
import chatController from '../controllers/chat.js'

router.route('/Chats').post((req, res) => {
  console.log("req.body.username", req.body.username);
  console.log("req.headers.authorization", req.headers.authorization);
  chatController.addChat(req, res);
});

router.route('/Chats').get((req, res) => {
  chatController.getChats(req, res);
});

router.route('/Chats/:id').delete((req, res) => {
  chatController.deleteChat(req, res);
});

export default router;