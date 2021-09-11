import Busboy from "busboy";
import { pipeline } from "stream/promises";
import fs from "fs";
import { logger } from "./logger";

export default class UploadHandler {
  constructor({ io, socketId, downloadsFolder, messageTimeDelay = 200 }) {
    (this.io = io),
      (this.socketId = socketId),
      (this.downloadsFolder = downloadsFolder),
      (this.ON_UPLOAD_EVENT = "file-upload");
    this.messageTimeDelay = messageTimeDelay;
  }

  canExecute(lastExecution) {}

  handleFileBytes(filename) {
    this.lastMessageSent = Date.now();

    async function* handleData(source) {
      let processedAlready = 0;
      for await (const chunk of source) {
        yield chunk;

        processedAlready += chunk.length;
        if (!this.canExecute(this.lastMessageSent)) {
          continue;
        }

        this.io
          .to(this.socketId)
          .emit(this.ON_UPLOAD_EVENT, { processedAlready, filename });

        logger.info(`File [${filename}] got ${processedAlready} 
                    bytes to ${this.socketId}`);
      }
    }

    return handleData.bind(this);
  }

  async onFile(fieldname, file, filename) {
    const saveTo = `${this.downloadsFolder}/${filename}`;

    await pipeline(
      //Get a readable stream
      file,
      // Filter, convert and transform data
      this.handleFileBytes.apply(this, [filename]),
      // end of process with a writable stream created
      fs.createWriteStream(saveTo)
    );
  }

  registerEvents(headers, onFinish) {
    const busboy = new Busboy({ headers });
    busboy.on("file", this.onFile.bind(this));
    busboy.on("finish", onFinish);

    return busboy;
  }
}
