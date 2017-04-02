const util = require("./util");
const crypto = require("./crypto");

function oneoffError(message) {
  console.log(`Error: ${message}`);
}

function uploadFile(crypted_data, cb, err) {
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
        return err(`Error uploading: ${response}`);
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
  let match = /\#([^-]+)-(.+)$/.exec(window.location.href);
  if(!match) {
    return;
  }
  let file = match[1],
      key = decodeURIComponent(match[2]);

  getFile(file, (response) => {
    let data = crypto.decryptFile(response, key);

    $('#app').append($(`<a href="data:${data.mime};base64,${data.data}">View Raw</a><br />`));
    $('#app').append(
      $(`<a download="${data.name}" href="data:application/octet-stream;base64,${data.data}">Download</a><br />`));
  });
}

///////////////////////////////////////////
//////////////// index.html ///////////////
function previewFile(file, err) {
  let reader  = new FileReader();

  reader.addEventListener("load", () => {
    uploadFile(crypto.encryptFile(file, reader), (res, key) => {
      window.location.href = `/view.html#${res.filename}-${encodeURIComponent(key)}`;
    }, err);
  }, false);

  if(file) {
    reader.readAsDataURL(file._file);
  }
}


module.exports = {
  uploadHook: (file, done) => {
    previewFile(file, done);
    done("Uploaded");
  },
  viewHook: () => {
    $(document).ready(getFileFromURL);
  }
};
