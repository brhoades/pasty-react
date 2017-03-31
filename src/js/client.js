const util = require("./util");
const crypto = require("./crypto");

function uploadError(xhr, status, error) {
  console.log(`Error: ${xhr}`);
  console.log(xhr);
  console.dir(xhr);

  if(!status || !error) {
    return `Undefined error. Perhaps the server is misconfigured?`;
  }

  return `Error: HTTP${status}: ${error}`;
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
      error: (xhr, status, error) => {
        return err(uploadError(xhr, status, error));
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
    let b64data = btoa(data.data);

    $('#app').append($(`<a href="data:${data.mime};base64,${b64data}">View Raw</a><br />`));
    $('#app').append(
      $(`<a download="${data.name}" href="data:application/octet-stream;base64,${b64data}">Download</a><br />`));
  });
}

function isView() {
  return /\#([^-]+)-(.+)$/.exec(window.location.href) != null;
}

///////////////////////////////////////////
//////////////// index.html ///////////////
function previewFile(file, err) {
  let reader  = new FileReader();

  reader.addEventListener("load", () => {
    uploadFile(crypto.encryptFile(file, reader), (res, key) => {
      if(res.error) {
        return err(res.error);
      }
      err("Successfully uploaded");
      console.log(res);
      // A random key so we actually redirect and reload the page
      let randomKey = encodeURIComponent(util.randomPassword(2));

      window.location += "?t=" + randomKey + "#" + res.filename + "-" + encodeURIComponent(key);
    }, err);
  }, false);

  if(file) {
    reader.readAsDataURL(file._file);
  }
}


module.exports = {
  uploadHook: (file, done) => {
    previewFile(file, done);
  },
  viewHook: () => {
    $(document).ready(getFileFromURL);
  },
  isView: isView
};
