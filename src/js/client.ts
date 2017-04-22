import { getConfig, randomPassword } from "./util"
import { crypto } from "./crypto"
import File from "./file"
declare var $: any;

function uploadFile(crypted_data, state, cb) {
   state.message("Getting configuration...");

   getConfig((config) => {
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
   });
}

function getFile(id: string, cb) {
   console.log("Getting file");
   getConfig((config) => {
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
   });
}

export function uploadHook(file: any, state: any): void {
   let reader: FileReader = new FileReader();

   reader.addEventListener("load", () => {
      uploadFile(crypto.encryptFile(file, reader), state, (res, key) => {
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

export function view(file: string, key: string, state: any): void {
   getFile(file, (response) => {
     state.message("Decrypting...");
     const dataBlob: { mime: string, data: string, name: string } = crypto.decryptFile(response, key);
     const data : File = new File(dataBlob.data, dataBlob.mime, file, dataBlob.name, key);

     state.message("Displaying...");

     state.data(data);
   });
}
