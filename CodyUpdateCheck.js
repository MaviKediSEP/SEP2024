const path = require('path');
const fs = require('fs');

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
      const addedFiles = getAddedFiles(newDir, oldDir);
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
      } else {
        console.log('No new files');
      }
    });
  }, 5000);
});

function getAddedFiles(newDir, oldDir) {
  return newDir.filter(file => !oldDir.includes(file));
}
