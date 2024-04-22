import path from 'path';
import fs from 'fs';
import { generateOutput } from './GenerateAIOutput.mjs';

let addedFiles = [];

// Get the absolute path to the cody-engine-main/packages/be directory
const myFolder = path.join(import.meta.dirname, 'cody-engine-main/packages/be');
fs.promises.readdir(myFolder).then(oldDir => {
  setInterval(() => {
    fs.promises.readdir(myFolder).then(newDir => {
      // Check for changes in the directory contents
      addedFiles = findAddedFiles(newDir, oldDir);
      if (addedFiles.length > 0) {
        console.log('New files found:');
        addedFiles.forEach(async file => {
          console.log(file);
          try {
            const data = await fs.promises.readFile(path.join(myFolder, file));
            generateOutput(data.toString());
          } catch (err) {
            console.error(err);
          }
        });
        oldDir = newDir; // Update oldDir to reflect the current directory state
      }
    }).catch(err => {
      console.error(err);
    });
  }, 5000);
}).catch(err => {
  console.error(err);
});

function findAddedFiles(newDir, oldDir) {
  return newDir.filter(file => !oldDir.includes(file));
}

function getAddedFiles(){
  return addedFiles;
}

function getMyFolder(){
  return myFolder;
}

export {
  getAddedFiles,
  getMyFolder
};
