import mongoose from 'mongoose';

// Define the UserPassName schema
const UserPassNameSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        required: true
    },
    contacts: [{
        username:{
        type: String
        }
    }],

});

// Create a Mongoose model
const UserPassName = mongoose.model('Users', UserPassNameSchema);

// Connect to the MongoDB server
mongoose.connect('mongodb://127.0.0.1:27017/DB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

export default UserPassName;