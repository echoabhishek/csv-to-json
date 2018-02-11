path = require 'path';
operate = require './operate';
inputFilePath = path.join(__dirname, '../input.csv');
outputFilePath = path.join(__dirname, '../output.json');

operate.csvToJson(inputFilePath, outputFilePath);