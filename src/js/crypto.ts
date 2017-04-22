import { randomPassword } from "./util"
declare var CryptoJS: any;

function decryptFile(data, key): string {
  let rawWords: string = CryptoJS.AES.decrypt(data, key);

  return CryptoJS.enc.Utf8.stringify(rawWords);
}

function encryptFile(b64data: string): { data: string, key: string } {
  let result: string = CryptoJS.enc.Utf8.parse(b64data);

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
