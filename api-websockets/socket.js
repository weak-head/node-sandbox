const io = require('socket.io');

let ioserver;

module.exports = {

    init: httpServer => {
        ioserver = io(httpServer);

        return ioserver;
    },

    getIO: () => {
        if (!ioserver) {
            throw new Error('Socket is not initialized');
        }

        return ioserver;
    }
}