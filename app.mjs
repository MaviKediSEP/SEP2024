import readline from 'readline';
import ollama from 'ollama';
import { extractHTML } from './GenerateAIOutput.mjs';
import fs from 'fs';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
fs.readFile('index.html', 'utf8', (err, data)=>{
  if(err){
    console.log("File not found" + err);
  }
  rl.question('Give me your prompt: ', async (promptInhalt) => {
    promptInhalt = data + promptInhalt;
    console.log(promptInhalt);
    const response = await ollama.chat({
      model: 'llama2',
      messages: [{ role: 'user', content: promptInhalt }],
    });

    console.log(response.message.content);
    
    const messageHTML = extractHTML(response.message.content);
    if (messageHTML === ''){
      console.error("leere Ausgabe der AI");
      process.exit();
    }
    console.log(messageHTML);
    const tempDateiPfad = 'index.html';

    fs.writeFile(tempDateiPfad, messageHTML, (err) => {
      if (err) {
        console.error('Fehler beim Schreiben der Ausgabe in die Datei:', err);
        return;
      }

      console.log('Ausgabe erfolgreich gespeichert.');
      console.log(`Die Ausgabe befindet sich in der Datei: ${tempDateiPfad}`);
    });

    // Close the readline interface after processing the response
    rl.close();
  });
});
