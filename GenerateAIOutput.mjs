import fs from 'fs';
import http from 'http';
import ollama from 'ollama';

async function generateOutput(promptInhalt) {

  const response = await ollama.chat({
    model: 'llama3',
    messages: [{ role: 'user', content: promptInhalt }],
  })
  console.log(response.message.content)

  const htmlContent = extractHTML(response.message.content);
          const tempDateiPfad = 'index.html';

          fs.writeFile(tempDateiPfad, htmlContent, (err) => {
            if (err) {
              console.error('Fehler beim Schreiben der Ausgabe in die Datei:', err);
              return;
            }

            console.log('Ausgabe erfolgreich gespeichert.');
            console.log(`Die Ausgabe befindet sich in der Datei: ${tempDateiPfad}`);
          });

}

function extractHTML(content) {
  // Find the index of the opening <!DOCTYPE> tag
  const startIndex = content.indexOf('<!DOCTYPE html>');
  if (startIndex === -1) {
    // No <!DOCTYPE> tag found, return empty string
    return "";
  }

  // Find the index of the closing </html> tag
  const endIndex = content.lastIndexOf('</html>');
  if (endIndex === -1) {
    // No </html> tag found, return empty string
    return "";
  }

  // Extract the content between the <!DOCTYPE> and </html> tags
  const extractedContent = content.substring(startIndex, endIndex + '</html>'.length);

  return extractedContent;
}

export { generateOutput, extractHTML };
