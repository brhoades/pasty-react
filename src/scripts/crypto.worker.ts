import {
  BlobParserI,
  decryptFile,
  encryptFile,
  EventCryptor,
  Paste,
  PasteParser,
} from "pasty-core";

import { IDecryptPayload, IEncryptPayload, isEncrypt } from "../helpers/workertypes";


const ctx: Worker = self as any;

ctx.addEventListener("message", (e: { data: { payload: IDecryptPayload | IEncryptPayload } }) => {
  try {
    if (isEncrypt(e.data.payload)) {
      const data: IEncryptPayload = e.data.payload;
      // restore from serialized form
      const paste: Paste = Paste.fromJSON(data.data);
      const cryptor: EventCryptor = new EventCryptor(paste, data.keysize);

      cryptor.on("progress", (progress: number) => {
        ctx.postMessage({
          payload: {
            progress,
          },
        });
      });

      cryptor.on("complete", (results) => {
        ctx.postMessage({
          payload: results,
        });

        // kill worker
        close();
      });

      cryptor.run();
    } else {
      const data: IDecryptPayload = e.data.payload;
      const dataBlob: BlobParserI = decryptFile(data.data, data.id, data.key);
      const paste: Paste = dataBlob.decrypt();

      ctx.postMessage({
        payload: paste.json(),
      });

      close();
    }
  } catch (e) {
    ctx.postMessage({
      error: e.message,
    });
  }
});
