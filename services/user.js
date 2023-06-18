import userPassName from '../models/userPassName.js';
import jwt from 'jsonwebtoken'

const getDetails = async (username, authorization) => {
    // Check if authorization header exists
    if (!authorization || !authorization.startsWith('Bearer ')) {
        return null;
    }

    var token;
    // Extract the token from the header
    try {
        token = JSON.parse(authorization.split(' ')[1]).token;
    } catch(err) {
        token = authorization.split(' ')[1]; //androaid
    }

    try {
        jwt.verify(token, process.env.KEY);

        const user = await userPassName.findOne(
            { username: username },
            { displayName: 1, profilePic: 1 }
        ).exec();

        if (user) {
            const profile = {
                displayName: user.displayName,
                profilePic: user.profilePic
            };
            return profile;
        }
    } catch (err) {
        return null;
    }
}

export default {
    getDetails
};
