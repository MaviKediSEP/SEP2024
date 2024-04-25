// script.js
document.getElementById("mainForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Get the selected values
    var templateValue = document.getElementById("template").value;
    var colorValue = document.getElementById("color").value;
    var fontValue = document.getElementById("font").value;
    var options = Array.from(document.querySelectorAll('input[name="options[]"]:checked')).map(checkbox => checkbox.value);
    var comments = document.getElementById("comments").value;

    // Create the text content for the file
    var fileContent = "Selected Template: " + templateValue + "\n" +
                      "Selected Color: " + colorValue + "\n" +
                      "Selected Font: " + fontValue + "\n" +
                      "Selected Options: " + options.join(", ") + "\n" +
                      "Additional Comments: " + comments;

    // Send an AJAX request to the Node.js server to save the file
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/save-file", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            alert("File saved successfully!");
        } else if (xhr.readyState === 4 && xhr.status !== 200) {
            alert("Failed to save file. Please try again.");
        }
    };
    xhr.send(JSON.stringify({ content: fileContent }));
});
