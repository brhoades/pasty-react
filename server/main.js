const express = require("express");
const bodyParser = require('body-parser')
const config = require("config");
const path = require("path");
const fs = require("fs");
const filesizeParser = require('filesize-parser');

const app = express();

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

// https://jsfiddle.net/Guffa/DDn6W/
function randomName(length) {
    var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOP1234567890";
    var pass = "";
    for (var x = 0; x < length; x++) {
        var i = Math.floor(Math.random() * chars.length);
        pass += chars.charAt(i);
    }
    return pass;
}

// Gets a unique filename that doesn't exist.
// Returns a hash of the name and full path to the file.
function getFilename() {
  const storage_path = config.get("server.storage.local");
  let full_path = "";
  let name = "";

  if(!fs.existsSync(storage_path)) {
    console.log(`"${storage_path}" does not exist, cannot create files in it.`);
    return;
  }

  do {
    name = randomName(config.get("server.storage.filename_length"));

    full_path = path.join(storage_path, name);
  } while(fs.existsSync(full_path));

  return {
    name: name,
    path: full_path
  };
}

// POST x-www-form-urlencoded with a data field
// Returns a JSON hash with "filename": "file name".
app.post("/paste", (req, res) => {
  let data = req.body.data;

  if(data.length > filesizeParser(config.get("server.storage.size_limit"))) {
    res.status(413);
    return;
  }

  let file_details = getFilename();
  if(!file_details) {
    res.status(500);
    return;
  }

  fs.writeFileSync(file_details.path, data.body);

  res.send({
    filename: file_details.name
  });
});

app.listen(3000, () => {
  console.log("Pasty server is listening on port 3000!");
});
