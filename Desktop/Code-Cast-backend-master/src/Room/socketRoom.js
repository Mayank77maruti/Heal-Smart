const diff = require('diff-match-patch');
const dmp = new diff.diff_match_patch();
let rooms = {};
const userSocketMap = new Map();


function createRoom(roomid, roomName, code, language, input, output) {
    if (!rooms[roomid]) {
        rooms[roomid] = {
            roomName,
            roomid,
            users: [],
            code,
            language,
            input,
            output
        }
    }
}

function deleteRoom(roomid) {
    console.log('dateleting room', roomid)
    if (rooms[roomid]) {
        delete rooms[roomid];
    }
}

function addRoomUser(roomid, user) {
    if (rooms[roomid]) {
        rooms[roomid].users.push(user);
    }
}

function removeRoomUser(roomid, userId) {
    let userName;
    if (rooms[roomid]) {
        rooms[roomid].users = rooms[roomid].users.filter(user => {
            if (user.id === userId) {
                userName = user.name;
                return false;
            }
            return true;
        });
    }
    if (rooms[roomid].users.length === 0)
        deleteRoom(roomid);
    return userName;
}

function getRoom(roomid) {
    return rooms[roomid] ? rooms[roomid] : null;
}

function updateRoomCode(roomid, patch) {
    if (rooms[roomid]) {
        try {
            const code = rooms[roomid].code;
            const [newCode, result] = dmp.patch_apply(patch, code);
            if (result[0])
                rooms[roomid].code = newCode;
            else
                console.log('patch failed');
        }
        catch (e) {
            console.log('update failed', e);
        }
    }
}

function updateCodeEditorCredentials(roomid, input = '', output = '', language = '') {
    if (rooms[roomid]) {
        console.log('update code editor credentials', input, output, language);
        try {
            rooms[roomid].input = input;
            rooms[roomid].output = output;
            rooms[roomid].language = language;
        } catch (e) { console.log(e) }

        console.log('after update', rooms[roomid])
    }
}

function deleteUser(userId) {
    for (let roomid in rooms) {
        for (let user in rooms[roomid].users) {
            if (rooms[roomid].users[user].id === userId) {
                return roomid;
            }
        }
    }
    return null;
}

function updateUserSocketMap(userId, socketId) {
    userSocketMap.set(userId, socketId);
}

module.exports = {
    createRoom,
    addRoomUser,
    removeRoomUser,
    getRoom,
    updateRoomCode,
    updateCodeEditorCredentials,
    deleteUser,
    updateUserSocketMap,
    userSocketMap
};
