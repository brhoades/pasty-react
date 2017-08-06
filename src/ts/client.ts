declare var require: any;
declare var $: any;
var promise = require("./vendor/promise.js");

import { CodeFile, randomPassword, encryptFile, decryptFile, PasteParser, Paste, PasteFile } from "pasty-core";
import config from "./config";
import UploadedFile from "./uploadedfile";
import Settings from "./settings";

function getFile(id: string, cb) {
  promise.get(`${config.get}${id}`).then((error: string, text: string) => {
    if(error) {
      console.log(error);
      return;
    }

    cb(text);
  });
}

function uploadPayload(crypted_data, state, cb) {
  state.message("Uploading...");

  promise.post(config.paste, {
    data: crypted_data.data
  }).then((error: boolean, text: string, xhr) => {
    if(error) {
      console.dir(xhr);
      return state.error(`Error uploading: ${xhr}`);
    }

    cb(JSON.parse(text), crypted_data.key);
  });
}

export function upload(paste: Paste, state: any): void {
  let settings: Settings = new Settings($);

  uploadPayload(encryptFile(paste.serialize(), settings.security.keysize), state, (res, key) => {
    if (res && res.error) {
      state.message(`Error uploading: ${res.error}`);
      console.log(res.error);
    } else {
      window.location.href = `#/view/${res.filename}/${encodeURIComponent(key)}`;
    }
  });
}

export function view(file: string, key: string, state: any): void {
  getFile(file, (response) => {
    state.message("Decrypting...");
    const dataBlob: string = decryptFile(response, key);
    const paste: Paste = PasteParser.parse(file, key, dataBlob);

    state.data(paste);
    state.message("Displaying...");
  });
}

// get a short url to this page
export function getShortURL(params): string {
  let ret = `${config.shortURL}#/view/${params.file}/${encodeURIComponent(params.key)}`;

  return params.options ? `${ret}/${params.options}` : ret;
}
