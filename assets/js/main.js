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

function encryptFile(e) {
  console.log("Encrypt file");
  let data = e.target.result;

  console.log(`Contents: ${data}`);

  let password = randomPassword(64);
  var crypted = CryptoJS.AES.encrypt(data, password).toString();

  console.log(`Encrypted: ${crypted}`);
  console.log(`Password: ${password}`);

  return {
    data: crypted,
    key: password
  };
}

function decryptFile(data, key) {
  console.log("Decrypted data", CryptoJS.AES.decrypt(data, key));
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
    decryptFile(response.body.data, key);
  });
}

$("#filename").fileReaderJS({
  on: {
    beforestart: (e, file) => true,
    loadstart: (e, file) => null,
    progress: (e, file) => null,
    error: (e, file) => console.log("ERROR"),
    load: (e, file) => {
      uploadFile(encryptFile(e), (res, key) => {
        window.location.href = res.url + encodeURIComponent(key);
      });
    }
  }
});
