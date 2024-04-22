const fs = require('fs');
const path = require('path');
const { getAddedFiles, getMyFolder } = require('./CodyUpdateCheck');
const htmlFolder = '/var/www/apacheserver/index.html';
const myFolder = getMyFolder();
// Read the HTML file
fs.readFile(htmlFolder, 'utf8', (err, htmlData) => {
  if (err) {
    console.error(err);
    return;
  }

// Find the position where you want to insert the new paragraph
const positionToInsert = htmlData.indexOf('<h1>Welcome to My Simple Website</h1>');
// Check if the position is found
if (positionToInsert !== -1) {
    setInterval(() => {
            if(getAddedFiles().length > 0){
                getAddedFiles().forEach(file => {
                    fs.readFile(path.join(myFolder, file), (err, filesData) => {
                        if (err) {
                          console.log(err);
                          return;
                        }
                        // Define the new paragraph to insert
                        var newParagraph = '<p>' + filesData.toString() + '</p>';
                        // Insert the new paragraph at the found position
                        const modifiedData = htmlData.slice(0, positionToInsert) + newParagraph + htmlData.slice(positionToInsert);

                        // Write the modified content back to the file
                        fs.writeFile(htmlFolder, modifiedData, 'utf8', (err) => {
                            if (err) {
                            console.error(err);
                            return;
                            }
                        });
                      });
                });
            }
    }, 10);
}
});