import net from 'net';

const server = net.createServer(socket => {
    console.log(`TCP handshake successful with ${socket.remoteAddress}:${socket.remotePort}`);

    // This is how to write data to the client back.
    socket.write('Hello client!');

    socket.on('data', (data) => {
        console.log(`Received data from the client ${data.toString()}`);
    })
})


server.listen(8800, '127.0.0.1');
// NOTE: You have to specify the host to listen on
// in order to prevent listenning from all hosts. 



// Client command:
// $ nc 127.0.0.1 8800 