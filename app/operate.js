const csvToJson = (inputFilePath, outputFilePath) => {
  let fs = require('fs'),
      outputJson = [];
      jsonObject = {};

  fs.readFile(inputFilePath, 'utf8', function(err, contents) {
    let writeStream = fs.createWriteStream(outputFilePath);
    let getKey = true;
    let keys = [];
    let lines = contents.split('\r\n').filter(Boolean);

    writeStream.write('[\n', 'utf8');

    lines.forEach((line, index) => {
        let words = line.split(',').filter(Boolean);
        let i = 0;
        words.forEach((word) => {
            if ((word.charAt(0) == word.charAt(word.length-1) == '"') && !isNaN(word)) word = word.splice(1, -1);
            else if (isNaN(word)) word = '"' + word + '"';
            if (getKey) jsonObject[word] = null;
            else {
                if (i > keys.length-1) throw "PLEASE CHECK INPUT:\nValues more than keys";
                jsonObject[keys[i]] = word;
                if (i < keys.length-1) jsonObject[keys[i+1]] = null;
            }
            i++;
        });
        if (getKey) {
            keys = Object.keys(jsonObject);
            getKey = !getKey;
        } else {
            writeStream.write('{', 'utf8');
            Object.keys(jsonObject).forEach((key, index) => {
                if (index == keys.length-1) writeStream.write(key + ': ' + jsonObject[key], 'utf8');
                else writeStream.write(key + ': ' + jsonObject[key] + ', ', 'utf8');
            });
            if (index == lines.length-1) writeStream.write('}\n', 'utf8');
            else writeStream.write('},\n', 'utf8');
            outputJson.push(jsonObject);
        }
    });

    writeStream.write(']', 'utf8');

    writeStream.on('finish', () => {
        console.log('All data has bene written to file :\n', outputFilePath);
    });

    writeStream.end();
    
    return outputJson;
  });
}

module.exports.csvToJson = csvToJson