import { getConfig, randomPassword } from "./util"
import { crypto } from "./crypto"
import config from "./config"
import UploadedFile from "./uploadedfile"
import CodeFile from "./codefile"
declare var $: any;

function uploadFile(crypted_data, state, cb) {
  state.message("Uploading...");

  $.ajax({
    type: "POST",
    url: config.paste,
    data: {
      data: crypted_data.data
    },
    success: (response) => cb(response, crypted_data.key),
    error: (response) => {
      return state.message(`Error uploading: ${response}`);
    }
  });
}

function getFile(id: string, cb) {
  console.log("Getting file");

  console.log(`${config.get}${id}`);
  $.ajax({
    type: "GET",
    url: `${config.get}${id}`,
    success: cb,
    complete: (xhr, status) => {
      if (xhr.status == 302) {
        return $.ajax({
          type: "GET",
          url: xhr.getResponseHeader("Location"),
          success: cb
        });
      }
    }
  });
}

export function uploadFileHook(file: any, state: any): void {
  let reader: FileReader = new FileReader();

  reader.addEventListener("load", () => {
    const mimeString: string = reader.result.split(',')[0].split(':')[1].split(';')[0]
    const byteString: string = reader.result.split(',')[1];
    const data = {
      name: file.name,
      data: byteString,
      mime: mimeString,
      type: "file"
    };

    uploadFile(crypto.encryptFile(JSON.stringify(data)), state, (res, key) => {
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

  uploadFile(crypto.encryptFile(JSON.stringify(data)), state, (res, key) => {
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
