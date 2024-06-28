const { createRoom, addRoomUser, removeRoomUser, getRoom, updateRoomCode, updateCodeEditorCredentials, deleteUser, updateUserSocketMap, userSocketMap } = require('../Room/socketRoom');

function manageRoom(socket, io) {

    const { id: socketId } = socket;

    socket.on('join', async ({ roomName = 'Room X', roomid, name, code = '', language = 'javascript', input = '', output = '', avatar = '' }) => {
        try {
            if (!name) {
                throw new Error('Invalid data');
            }
            createRoom(roomid, roomName, code, language, input, output);

            addRoomUser(roomid, { id: socketId, name, avatar });

            await socket.join(roomid);

            socket.emit('join', { msg: `Welcome to ${roomName}`, room: getRoom(roomid), socketId });
            socket.to(roomid).emit('userJoin', { msg: `New user joined ${name}`, newUser: { id: socketId, name, avatar } });
        } catch (err) {
            console.log(err);
            socket.emit('error', { error: err });
        }
    });

    socket.on('update', ({ roomid, patch }) => {
        try {
            updateRoomCode(roomid, patch);
            socket.to(roomid).emit('update', { patch });
        } catch (err) {
            console.log(err);
            socket.emit('error', { error: err });
        }
    });

    socket.on('leave', ({ roomid }) => {
        try {
            const name = removeRoomUser(roomid, socketId);
            socket.leave(roomid);
            io.to(roomid).emit('userLeft', { msg: `${name} left the room`, userId: socketId });
            console.log('user left', name);
            socket.to(roomid).emit('user left video call', { msg: `${name} left the room`, userID: socketId });
        } catch (err) {
            console.log(err);
            socket.emit('error', { error: err });
        }
    });

    socket.on('updateIO', ({ roomid, input, output, language }) => {
        try {
            updateCodeEditorCredentials(roomid, input, output, language);
            socket.to(roomid).emit('updateIO', {
                newinput: input,
                newoutput: output,
                newlanguage: language
            });
        } catch (err) {
            console.log(err);
            socket.emit('error', { error: err });
        }
    })

    socket.on('getRoom', ({ roomid }) => {
        try {
            io.in(roomid).emit('getRoom', { room: getRoom(roomid) });
        } catch (err) {
            console.log(err);
            socket.emit('error', { error: err });
        }
    })

    socket.on('disconnect', () => {
        for (let [key, value] of userSocketMap.entries()) {
            if (value === socketId) {
                userSocketMap.delete(key);
                break;
            }
        }
        let roomid = deleteUser(socketId);
        if (roomid !== null) {
            const name = removeRoomUser(roomid, socketId);
            socket.leave(roomid);
            io.to(roomid).emit('userLeft', { msg: `${name} left the room`, userId: socketId });
            console.log('user left', name);
            socket.to(roomid).emit('user left video call', { msg: `${name} left the room`, userID: socketId });
        }
    });


    socket.on("drawData", (data) => {
        socket.to(data.roomId).emit("drawData", data);
    });

    socket.on("start-video", ({ roomID }) => {
        let allUsers = getRoom(roomID).users;
        allUsers = allUsers.filter(user => user.id !== socketId);
        socket.emit('allUsers', allUsers);
    });

    socket.on("sending video signal", (data) => {
        socket.to(data.userToSignal).emit("new video user joined", { signal: data.signal, callerID: data.callerID, userSending: data.userSending });
    });

    socket.on("returning video signal from receiver", (data) => {
        socket.to(data.callerID).emit("sender receiving final signal", { signal: data.signal, id: socketId });
    });

    socket.on("toggle-video", (data) => {
        socket.broadcast.to(data.roomID).emit("toggle-video", { userID: data.userID });
    })

    socket.on("toggle-audio", (data) => {
        socket.broadcast.to(data.roomID).emit("toggle-audio", { userID: data.userID });
    })

    socket.on("map socket", ({ userID }) => {
        userSocketMap.set(userID, socketId);
    })

    socket.on("join permission", ({ room, user }) => {
        let owner = userSocketMap.get(room.owner);
        console.log(socketId);
        io.to(owner).emit("join permission", { room, user, senderID: socketId });
    })

    socket.on("accept permission", ({ senderID }) => {
        io.to(senderID).emit("permission accepted")
    })

    socket.on("reject permission", ({ senderID }) => {
        io.to(senderID).emit("permission rejected")
    })

}

module.exports = manageRoom;
