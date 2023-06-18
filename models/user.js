import mongoose from 'mongoose'

const Schema = mongoose.Schema;
const User = new Schema({
    usernmae: {
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
    }
});
export default mongoose.model('User', User);
