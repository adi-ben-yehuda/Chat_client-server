import chatService from '../services/chat.js'

const addChat = async (req, res) => {
  var chat = await chatService.createChat(req.body.username, req.headers.authorization);



  var error = '';

  if (chat === "ok" || chat === "chatExist") {
    res.status(200).json({ok: "ok" });

  }
  else if(chat === "notRegister" ) {
    res.status(400).json({error: "The user doesn't exist" })
  } else if (chat === null){
    res.status(401)
  } 
  else if(chat === "exist") {
    res.status(402).json({error: "The contact is already exist" })
  }
   else if(chat === "empty") {
    res.status(403).json({error: "please enter username" })
  } else if (chat === "me") {
    res.status(405).json({error: "you cannot add yourself" })
  }
  
};

const getChats = async (req, res) => {
  var chats = await chatService.createContacts(req.headers.authorization);

  if(chats === null ) {
    res.status(401)
  }

  res.json(chats);
};



const deleteChat = async (req, res) => { 

  var chat = await chatService.deleteC(req.params.id, req.headers.authorization);
   if(chat === "200" ) {
    res.json({ok: '200'});
  } else if (chat === "400"){
    res.status(400).json({error: "not found" })
  } else if(chat === "404") {
    res.status(404).json({error: "error" })
  } 
};

export default{
  addChat,
  getChats,
  deleteChat
};