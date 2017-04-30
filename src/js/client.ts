declare var require: any;
declare var $: any;
var promise = require("./vendor/promise.js");

import { randomPassword } from "./util"
import { crypto } from "./crypto"
import config from "./config"
import UploadedFile from "./uploadedfile"
import CodeFile from "./codefile"
import Settings from "./settings"

function uploadFile(crypted_data, state, cb) {
  state.message("Uploading...");

  promise.post(config.paste, {
    data: crypted_data.data
  }).then((error: boolean, text: string, xhr) => {
    if(error) {
      console.dir(xhr);
      return state.message(`Error uploading: ${xhr}`);
    }

    cb(JSON.parse(text), crypted_data.key);
  });
}

function getFile(id: string, cb) {
  promise.get(`${config.get}${id}`).then((error: string, text: string) => {
    if(error) {
      console.log(error);
      return;
    }

    cb(text);
  });
}

export function uploadFileHook(file: any, state: any): void {
  let reader: FileReader = new FileReader();
  let settings: Settings = new Settings($);

  reader.addEventListener("load", () => {
    const mimeString: string = reader.result.split(',')[0].split(':')[1].split(';')[0]
    const byteString: string = reader.result.split(',')[1];
    const data = {
      name: file.name,
      data: byteString,
      mime: mimeString,
      type: "file"
    };

    uploadFile(crypto.encryptFile(JSON.stringify(data), settings.security.keysize),
               state, (res, key) => {
      if (res && res.error) {
        state.message(`Error uploading: ${res.error}`);
        console.log(res.error);
      } else {
        window.location.href = `#/view/${res.filename}/${encodeURIComponent(key)}`;
      }
    });
  }, false);

  if (file) {
    reader.readAsDataURL(file._file);
  }
}

export function uploadCodeFiles(files: [CodeFile], state: any): void {
  let data = {
    files: files.map((f) => f.rawObject()),
    type: "code"
  };
  let settings: Settings = new Settings($);

  uploadFile(crypto.encryptFile(JSON.stringify(data), settings.security.keysize), state, (res, key) => {
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
    const dataBlob: any = JSON.parse(crypto.decryptFile(response, key));

    if(dataBlob.type == "file") {
      const data : UploadedFile = new UploadedFile(dataBlob.data, dataBlob.mime, file, dataBlob.name, key);
      state.data(data);
    } else {
      let data = dataBlob;
      data.files = data.files.map((f) => new CodeFile(f.id, f.name, f.contents, f.type));

      state.data(data);
    }

    state.message("Displaying...");
  });
}

// get a short url to this page
export function getShortURL(params): string {
  let ret = `${config.shortURL}#/view/${params.file}/${encodeURIComponent(params.key)}`;

  return params.options ? `${ret}/${params.options}` : ret;
}
