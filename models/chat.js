import mongoose from 'mongoose';

const ChatSchema = new mongoose.Schema({
    id: {
        type: Number
    },
    users: [{
        username: String,
        displayName: String,
        profilePic: String

    }],
    messages: [{
        id: Number,
        created: {
            type: Date,
            default: Date.now
        },
        sender: {
            username: {
                type: String,
                required: true
            }
        },
        content: String
    }],
});

const Chat = mongoose.model('Chat', ChatSchema);

// Connect to the MongoDB server
mongoose.connect('mongodb://127.0.0.1:27017/DB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

export default Chat;
