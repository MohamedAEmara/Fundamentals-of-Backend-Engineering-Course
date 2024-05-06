import dgram from 'dgram';


const socket = dgram.createSocket("udp4");

// listening
// NOTE: if we don't specify the address, it will be listening on ALL ADDRESSES  
socket.bind(5500, "127.0.0.1");

// What we gonna do when we receive a message??
socket.on('message', (msg, info) => {
    console.log(`my server got a datagram ${msg} from ${info.address}:${info.port}`);
}) 

// NOW, to send a message from a client:
//  $ nc -u 127.0.0.1 5500
// Then hit enter and enter the messages you want.