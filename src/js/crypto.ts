import { randomPassword } from "./util"
declare var CryptoJS: any;

function decryptFile(data, key): string {
  let rawWords: string = CryptoJS.AES.decrypt(data, key);
  let jsonPayload: string = CryptoJS.enc.Utf8.stringify(rawWords);
  return JSON.parse(jsonPayload);
}

function encryptFile(file, e): { data: string, key: string } {
  let payload = {
    name: file.name,
    data: null,
    mime: null
  };

  let data: string = e.result;
  let mimeString: string = data.split(',')[0].split(':')[1].split(';')[0]
  let byteString: string = data.split(',')[1];
  payload.mime = mimeString;
  payload.data = byteString;

  let result: string = CryptoJS.enc.Utf8.parse(JSON.stringify(payload));

  let password: string = randomPassword(32);
  let encrypted: any = CryptoJS.AES.encrypt(result, password);
  result = encrypted.toString();

  return {
    data: result,
    key: password
  };
}


export let crypto = {
  decryptFile: decryptFile,
  encryptFile: encryptFile
};
