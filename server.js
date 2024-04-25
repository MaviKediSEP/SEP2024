const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 3000;

app.use(express.json());

app.post("/save-file", (req, res) => {
    const content = req.body.content;

    // Specify the path where the file should be saved
    const filePath = path.join(__dirname, "prompt.txt");

    // Write the content to the file
    fs.writeFile(filePath, content, (err) => {
        if (err) {
            console.error("Failed to save file:", err);
            res.status(500).send("Failed to save file: " + err.message);
        } else {
            console.log("File saved successfully.");
            res.status(200).send("File saved successfully.");
        }
    });
});

app.use(express.static(path.join(__dirname, "")));

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
