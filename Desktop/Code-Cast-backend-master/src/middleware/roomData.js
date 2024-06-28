const randomstring = require("randomstring");
const Codes = require('./../utils/constants/default_code.json')
// name of the room must be passed in the body
const roomData = (req, res, next) => {
    try {
        const name = req.body.name;
        // if needed we can use uuid but it's too big to rembember
        const roomid = randomstring.generate(6)
        const language = req.user.editor.language;
        const code = Codes[language].snippet;
        const owner = req.user._id;
        const room = {
            name,
            roomid,
            code,
            language,
            owner
        }
        req.room = room;
        next();
    }
    catch (e) {
        console.log(e);
        res.status(400).send('failed to create room');
    }
}

module.exports = roomData