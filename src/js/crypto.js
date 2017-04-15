const util = require("./util");

function decryptFile(data, key) {
  // base64 to a buffer array
  let cipherParams = CryptoJS.lib.CipherParams.create({
    ciphertext: CryptoJS.enc.Base64.parse(data)
  });
  let raw = CryptoJS.AES.decrypt(cipherParams, key);

  console.dir(raw);
  console.dir(btoa(raw));

  data = CryptoJS.enc.Base64.stringify(atob(CryptoJS.AES.decrypt(cipherParams, key)));
  console.log(data);

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
  console.log(`1: ${byteString.length}`);
  payload.data = byteString;

  payload = JSON.stringify(payload);
  console.log(`2: ${payload.length}`);

  let password = util.randomPassword(32);
  let encrypted = CryptoJS.AES.encrypt(payload, password);
  payload = encrypted.ciphertext.toString(CryptoJS.enc.Base64);

  console.log(`3: ${payload.length}`);

  return {
    data: payload,
    key: password
  };
}


module.exports = {
  decryptFile: decryptFile,
  encryptFile: encryptFile
};
