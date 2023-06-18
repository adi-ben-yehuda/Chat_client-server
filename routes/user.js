import express from 'express'
var router = express.Router();
import userController from '../controllers/user.js'

router.route('/Users/:username').get((req, res) => {
    userController.getDetails(req, res);
});

export default router;