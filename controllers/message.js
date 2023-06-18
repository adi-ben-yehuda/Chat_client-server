import messageService from '../services/message.js'

const addMsg = async (req, res) => {
  var msg = await messageService.addMessage(req.params.id, req.body.msg, req.headers.authorization);
  if (msg === null) {
    res.status(400).json({error:'error'});
  }
  else {
    res.json({ok:'ok'});
  }
};

const getMsg = async (req, res) => {
  var msg = await messageService.getMessage(req.params.id, req.headers.authorization);

  if (msg === "1") {
    res.status(400)
  }
  else {
    if (msg.length === 0) {
      res.json([]);
    } else {
      res.json(msg);
    }
  }
};

export default {
  addMsg,
  getMsg
};