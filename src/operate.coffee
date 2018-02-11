csvToJson = (inputFilePath, outputFilePath) -> 
    fs = require 'fs';
    csv = require 'fast-csv';
    outputJson = [];
    jsonObject = {};

    stream = fs.createReadStream inputFilePath;
    writeStream = fs.createWriteStream outputFilePath;
    writeStream.write '[\n';
    isFirstLine = true;

    csv
    .fromStream stream, {headers : true,
    ignoreEmpty: true,
    discardUnmappedColumns: true,
    strictColumnHandling: true,
    trim: true,
    delimiter: ',',
    rowDelimiter: '\n'}
    .validate (data) ->
        # put you own validation filters here
        return data;
    .on "data-invalid", (data) ->
        # do something with invalid row
    .on "data", (data) ->
        if isFirstLine
            isFirstLine = false;
        else
            writeStream.write ',\n';
        writeStream.write JSON.stringify(data).replace(/:/g, ': ').replace(/,/g, ', ');
        # console.log(data);
    .on "end", (count) ->
        writeStream.write '\n]';
        console.log(count + ' rows have been written to file :\n', outputFilePath);

module.exports.csvToJson = csvToJson