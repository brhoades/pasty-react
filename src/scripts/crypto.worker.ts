import {
  encryptFile,
  BlobParserI,
  decryptFile,
  Paste,
  PasteParser,
} from 'pasty-core';

import { IDecryptPayload, IEncryptPayload, isEncrypt } from '../helpers/workertypes';


const ctx: Worker = self as any;

ctx.addEventListener("message", (e: { data: { payload: IDecryptPayload | IEncryptPayload } }) => {
  try {
    if (isEncrypt(e.data.payload)) {
      const data: IEncryptPayload = e.data.payload;
      // restore from serialized form
      const paste: Paste = Paste.fromJSON(data.data);

      ctx.postMessage({
        payload: encryptFile(paste, data.keysize),
      });

      close();
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
