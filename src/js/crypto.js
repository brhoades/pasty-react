const util = require("./util");

function decryptFile(data, key) {
  // base64 to a buffer array
  data = CryptoJS.AES.decrypt(atob(data), key);
  data = JSON.parse(CryptoJS.enc.Utf8.stringify(data));

  return data;
}

function encryptFile(file, e) {
  let payload = {
    name: file.name
  };

  let data = e.result;
  let mimeString = data.split(',')[0].split(':')[1].split(';')[0]
  let byteString = data.split(',')[1];
  payload.mime = mimeString;
  payload.data = atob(byteString);

  payload = JSON.stringify(payload);

  let password = util.randomPassword(32);
  let crypted = btoa(CryptoJS.AES.encrypt(payload, password));

  return {
    data: crypted,
    key: password
  };
}


module.exports = {
  decryptFile: decryptFile,
  encryptFile: encryptFile
};
