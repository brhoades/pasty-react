var CryptoJS = null;

const algorithm = 'aes-256-ctr';

requirejs(["assets/js/libs/crypto-js/crypto-js.js"], (cjs) => {
  CryptoJS = cjs;
  getFileFromURL();
});

// https://jsfiddle.net/Guffa/DDn6W/
function randomPassword(length) {
    var chars = "abcdefghijklmnopqrstuvwxyz!@#$%^&*()-+<>ABCDEFGHIJKLMNOP1234567890";
    var pass = "";
    for (var x = 0; x < length; x++) {
        var i = Math.floor(Math.random() * chars.length);
        pass += chars.charAt(i);
    }
    return pass;
}

function encryptFile(file, e) {
  let payload = {
    name: file.name
  };

  let data = e.target.result;
  let mimeString = data.split(',')[0].split(':')[1].split(';')[0]
  let byteString = data.split(',')[1];
  payload.mime = mimeString;
  payload.data = byteString;

  payload = JSON.stringify(payload);

  let password = randomPassword(64);
  let crypted = atob(CryptoJS.AES.encrypt(payload, password));

  return {
    data: crypted,
    key: password
  };
}

function decryptFile(data, key) {
  // base64 to a buffer array
  data = CryptoJS.AES.decrypt(btoa(data), key);
  data = JSON.parse(CryptoJS.enc.Utf8.stringify(data));

  return data;
}

function uploadFile(crypted_data, cb) {
  console.log("Upload file");

  $.ajax({
    type: "POST",
    url: "http://localhost:3000/paste",
    data: {
      data: crypted_data.data
    },
    success: (response) => cb(response, crypted_data.key)
  });
}

function getFile(id, cb) {
  $.ajax({
    type: "GET",
    url: `http://localhost:3000/get/${id}`,
    success: cb
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
    let data = decryptFile(response, key);

    $('body').append($(`<a href="data:${data.mime};base64,${data.data}">View Raw</a><br />`));
    $('body').append(
      $(`<a download="${data.name}" href="data:application/octet-stream;base64,${data.data}">Download</a><br />`));
  });
}

///////////////////////////////////////////
//////////////// index.html ///////////////
$("#filename").fileReaderJS({
  on: {
    beforestart: (e, file) => true,
    loadstart: (e, file) => null,
    progress: (e, file) => null,
    error: (e, file) => console.log("ERROR", e),
    load: (e, file) => {
      uploadFile(encryptFile(file, e), (res, key) => {
        window.location.href = res.url + encodeURIComponent(key);
      });
    }
  }
});
