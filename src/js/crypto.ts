import { randomPassword } from "./util"
import { CryptoJS } from "crypto-js"

function decryptFile(data, key): string {
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
    payload.data = atob(byteString);

    let result: string = JSON.stringify(payload);

    let password: string = randomPassword(32);
    let encrypted: any = CryptoJS.AES.encrypt(payload, password);
    result = encrypted.ciphertext.toString(CryptoJS.enc.Base64);

    return {
        data: result,
        key: password
    };
}


export let crypto = {
    decryptFile: decryptFile,
    encryptFile: encryptFile
};
