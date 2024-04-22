const path = require('path');
const fs = require('fs');
const { generateOutput } = require('./GenerateAIOutput')
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
          generateOutput();
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
