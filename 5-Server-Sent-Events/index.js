// Client Code 
/*
    let sse = new EventSource("http://localhost:8080/stream");
    sse.onmessage = console.log

*/


const app = require('express')();

app.get('/', (req, res) => {
    res.send('hello!');
});


app.get('/stream', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    send(res);
});


const port = 3000;

let i = 0;

function send(res) {
    // The client captures the start and the end of each event 
    // by determining the starting with "data:" and ending with "\n\n"
    res.write("data: " + `hello from server ---- [${i++}]\n\n`);
    setTimeout(() => {
        send(res)
    }, (3000));
}


app.listen(port);
console.log(`Listening on port ${port}...`);