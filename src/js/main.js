const util = require("./util");
const crypto = require("./crypto");

require('./app/index.js');
import css from '../css/main.css';
import css2 from '../css/libs/blaze.min.css';

function oneoffError(message) {
  console.log(`Error: ${message}`);
  riot.mount('rg-alerts', {
    alerts: [{
      type: 'error',
      text: message
    }]
  });
}

function uploadFile(crypted_data, cb) {
  console.log("Upload file");
  util.getConfig((config) => {
    $.ajax({
      type: "POST",
      url: config.paste,
      data: {
        data: crypted_data.data
      },
      success: (response) => cb(response, crypted_data.key),
      error: (response) => {
        console.log("ERROR UPLOADING");
        oneoffError("Error uploading.");
      }
    });
  });
}

function getFile(id, cb) {
  console.log("Getting file");
  util.getConfig((config) => {
    $.ajax({
      type: "GET",
      url: `${config.get}${id}`,
      success: cb,
      complete: (xhr, status) => {
        if(xhr.status == 302) {
          return $.ajax({
            type: "GET",
            url: xhr.getResponseHeader("Location"),
            success: cb
          });
        }
      }
    });
  });
}

/////////////////////////////////////////
/////////////// view.html ///////////////
// call on doc ready
// gets the file from the url, gets data from the server,
// decrypts it, then downloads it
function getFileFromURL() {
  let match = /\/view.html\#([^-]+)-(.+)$/.exec(window.location.href);
  if(!match) {
    return;
  }
  let file = match[1],
      key = decodeURIComponent(match[2]);

  getFile(file, (response) => {
    let data = crypto.decryptFile(response, key);

    $('body').append($(`<a href="data:${data.mime};base64,${data.data}">View Raw</a><br />`));
    $('body').append(
      $(`<a download="${data.name}" href="data:application/octet-stream;base64,${data.data}">Download</a><br />`));
  });
}

///////////////////////////////////////////
//////////////// index.html ///////////////
function previewFile() {
  let file    = document.querySelector('input[type=file]').files[0];
  let reader  = new FileReader();
  console.log("file");

  reader.addEventListener("load", () => {
    console.log(reader);
    uploadFile(crypto.encryptFile(file, reader), (res, key) => {
      console.log(res);
      window.location.href = res.url + encodeURIComponent(key);
    });
  }, false);

  if(file) {
    reader.readAsDataURL(file);
  }
}

$("#upload").click(previewFile);
$(document).ready(getFileFromURL);
