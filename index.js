require ('coffeescript/register');

let path = require('path'),
    operate = require('./app/operate'),
    inputFilePath = path.join(__dirname, './input.csv'),
    outputFilePath = path.join(__dirname, './output.json');

operate.csvToJson(inputFilePath, outputFilePath);