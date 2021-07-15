const ioListeners = io => {
    io.on('connection', socket => {
        const id = socket.handshake.query.id
        console.log('hello from io ')
    })
}

export default ioListeners
