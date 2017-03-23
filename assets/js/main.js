var CryptoJS = null;

const algorithm = 'aes-256-ctr';

requirejs(["assets/js/libs/crypto-js/crypto-js.js"], (cjs) => {
  CryptoJS = cjs;
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
  var crypted = CryptoJS.AES.encrypt(data, password);

  console.log(`Encrypted: ${crypted}`);
  console.log(`Password: ${password}`);

  return crypted;
}

function uploadFile(e) {
  console.log("Upload file");
}

$("#filename").fileReaderJS({
  on: {
    beforestart: (e, file) => true,
    loadstart: (e, file) => null,
    progress: (e, file) => null,
    error: (e, file) => console.log("ERROR"),
    load: (e, file) => {
      encryptFile(e);
      uploadFile(e);
    }
  }
});
