/*
Dieser Code scannt ein Verzeichnis nach Textdateien, liest 
den Inhalt dieser Dateien und fügt sie zu einer einzigen Datei zusammen.
*/

const fs = require('fs');
const path = require('path');

// Function to scan a directory and get all .txt files
function getAllTxtFiles(directoryPath, callback) {
    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            return callback(err);
        }
        
        const txtFiles = files.filter(file => path.extname(file) === '.txt');
        callback(null, txtFiles);
    });
}

// Function to concatenate contents of all .txt files into one
function concatenateTxtFiles(txtFiles, outputPath) {
    const outputStream = fs.createWriteStream(outputPath);

    txtFiles.forEach(txtFile => {
        const filePath = path.join(__dirname, txtFile);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        outputStream.write(fileContents);
        outputStream.write('\n');
    });

    outputStream.end();
}

const folderPath = __dirname; // Change this to your folder path
const outputPath = './output.txt'; // Change this to your desired output file path

getAllTxtFiles(folderPath, function(err, txtFiles) {
    if (err) {
        console.error('Error reading directory:', err);
        return;
    }
    
    if (txtFiles.length === 0) {
        console.log('No .txt files found in the directory.');
        return;
    }

    console.log('Concatenating the following .txt files:', txtFiles);
    concatenateTxtFiles(txtFiles, outputPath);
    console.log('Concatenation completed. Check output.txt.');
});
