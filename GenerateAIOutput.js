const fs = require('fs');
const http = require('http');
const path = require('path');

function generateOutput() {
  const dateiPfad = path.join(__dirname, 'input.txt');

  fs.readFile(dateiPfad, 'utf8', (err, promptInhalt) => {
    if (err) {
      console.error('Fehler beim Lesen der Datei:', err);
      return;
    }

    const postData = JSON.stringify({
      model: 'llama3',
      prompt: promptInhalt,
      format: 'json',
      stream: false
    });

    const options = {
      hostname: 'localhost',
      port: 11434,
      path: '/api/generate',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': postData.length
      }
    };

    const req = http.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          console.log('API-Antwort:', response);

          if (!response || !response.hasOwnProperty('response')) {
            console.error('Die Antwortdaten haben nicht die erwartete Struktur.');
            return;
          }

          let ausgabe = response.response;
          ausgabe = ausgabe.replace(/\\n/g, '');

          const tempDateiPfad = 'ausgabe.txt';

          fs.writeFile(tempDateiPfad, ausgabe, (err) => {
            if (err) {
              console.error('Fehler beim Schreiben der Ausgabe in die Datei:', err);
              return;
            }

            console.log('Ausgabe erfolgreich gespeichert.');
            console.log(`Die Ausgabe befindet sich in der Datei: ${tempDateiPfad}`);
          });
        } catch (error) {
          console.error('Fehler beim Verarbeiten der API-Antwort:', error);
        }
      });
    });

    req.on('error', (error) => {
      console.error('Fehler bei der Anfrage:', error);
    });

    req.write(postData);
    req.end();
  });
}

module.exports = generateOutput;
