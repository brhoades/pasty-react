const util = require("./util");
const crypto = require("./crypto");

function uploadFile(crypted_data, state, cb) {
  state.message("Getting configuration...");

  util.getConfig((config) => {
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

function getFile(id, cb) {
  console.log("Getting file");
  util.getConfig((config) => {
    console.log(`${config.get}${id}`);
    $.ajax({
      type: "GET",
      url: `${config.get}${id}`,
      success: cb,
      complete: (xhr, status) => {
        if(xhr.status == 302) {
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

function previewFile(file, state) {
  let reader  = new FileReader();

  reader.addEventListener("load", () => {
    uploadFile(crypto.encryptFile(file, reader), state, (res, key) => {
      if(res && res.error) {
        state.message(`Error uploading: ${res.error}`);
        console.log(res.error);
      } else {
        window.location.href = `#/view/${res.filename}/${encodeURIComponent(key)}`;
      }
    });
  }, false);

  if(file) {
    reader.readAsDataURL(file._file);
  }
}


module.exports = {
  uploadHook: previewFile,
  view: (file, key, state) => {
    getFile(file, (response) => {
      state.message("Decrypting...");
      let data = crypto.decryptFile(response, key);

      // TODO: separate data object
      // TODO: get configuration URL.
      state.message("Displaying...");
      data.fileDataB64 = () => {
        return `data:${data.mime};base64,${data.data}`;
      };

      data.fileDataB64Download = () => {
        return `data:application/octet-stream;base64,${data.data}`;
      };

      data.getURL = () => {
        let baseLocation = location.href.replace(location.hash, "");
        return `${baseLocation}#/view/${file}/${encodeURIComponent(key)}`;
      };

      data.getRawURL = () => {
        return `${data.getURL()}/raw`
      }

      state.data(data);
    });
  }
};
