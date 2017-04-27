import { randomPassword } from "./util"
import * as CAES from "crypto-js/aes"
import * as CENC from "crypto-js/enc-utf8"

function decryptFile(data, key): string {
  let rawWords: string = CAES.decrypt(data, key);

  return CENC.stringify(rawWords);
}

function encryptFile(b64data: string): { data: string, key: string } {
  let result: string = CENC.parse(b64data);

  let password: string = randomPassword(32);
  let encrypted: any = CAES.encrypt(result, password);
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
