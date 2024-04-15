const fs = require('fs');


console.log('1');


const text = fs.readFileSync('./test.txt');


// console.log(text);

console.log("file: " + text);

console.log('2');