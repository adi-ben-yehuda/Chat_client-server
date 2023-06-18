import mongoose from 'mongoose'
import User from './user.js';

const messageSchema = new mongoose.Schema({
    id: {
        type: Number
    },
    created: {
        type: Date, //Date
        default: Date.now
    },
    sender: {
        username: {
            type: String,
            required: true
        }
    },
    content: {
        type: String
    }
});
const Msg = mongoose.model('Messages', messageSchema);

// Connect to the MongoDB server
mongoose.connect('mongodb://127.0.0.1:27017/DB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

export default Msg;
