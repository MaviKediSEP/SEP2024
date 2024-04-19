const path = require('path');
const fs = require('fs');
let addedFiles = [];

// Get the absolute path to the cody-engine-main/packages/be directory
const myFolder = path.join(__dirname, '/cody-engine-main/packages/be');

fs.readdir(myFolder, (err, oldDir) => {
  if (err) {
    console.error(err);
    return;
  }

  setInterval(() => {
    fs.readdir(myFolder, (err, newDir) => {
      if (err) {
        console.error(err);
        return;
      }
      // Check for changes in the directory contents
      addedFiles = findAddedFiles(newDir, oldDir);
      if (addedFiles.length > 0) {
        console.log('New files found:');
        addedFiles.forEach(file => {
          console.log(file);
          fs.readFile(path.join(myFolder, file), (err, data) => {
            if (err) {
              console.log(err);
              return;
            }
            console.log('Inhalt der Datei:')
            console.log(data.toString());
          });
        });
        oldDir = newDir; // Update oldDir to reflect the current directory state
      }
    });
  }, 5000);
});

function findAddedFiles(newDir, oldDir) {
  return newDir.filter(file => !oldDir.includes(file));
}
function getAddedFiles(){
    return addedFiles
};
function getMyFolder(){
    return myFolder;
};
module.exports = {
    getAddedFiles,
    getMyFolder
};
