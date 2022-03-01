import io from 'socket.io-client';

const socket = io("https://chat.shareslate.com:301");

// socket.connect();
// socket.on('connect', () => {
//     console.log("socket connected");
//     socket.on("connect_error", (err) => {
//         console.log(`connect_error due to ${err}`);
//     });
// })

export default socket;