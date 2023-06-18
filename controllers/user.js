import userService from '../services/user.js'

const getDetails = async (req, res) => {
    const details = await userService.getDetails(req.params.username, req.headers.authorization);

    if (details !== null) {
        res.json({
            displayName: details.displayName,
            profilePic: details.profilePic
          });
    } else {
        return res.status(404);
    }
};

export default {
    getDetails
};