import express from 'express'
var router = express.Router();
import messageController from '../controllers/message.js'

router.route('/Chats/:id/Messages').post((req, res) => {
  messageController.addMsg(req, res);
});

router.route('/Chats/:id/Messages').get((req, res) => {
  messageController.getMsg(req, res);
});
export default router;