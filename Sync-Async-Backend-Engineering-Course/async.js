const fs = require('fs');


console.log('1');


const text = fs.readFile('./test.txt', (err, data) => console.log(data.toString()));


// console.log(text);

console.log("file: " + text);

console.log('2');