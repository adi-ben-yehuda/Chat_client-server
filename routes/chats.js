import express from 'express'
var router = express.Router();
import chatController from '../controllers/chat.js'

router.route('/Chats').post((req, res) => {
  chatController.addChat(req, res);
});

router.route('/Chats').get((req, res) => {
  chatController.getChats(req, res);
});

router.route('/Chats/:id').get((req, res) => {
  chatController.getChat(req, res);
});

router.route('/Chats/:id').delete((req, res) => {
  chatController.deleteChat(req, res);
});

export default router;