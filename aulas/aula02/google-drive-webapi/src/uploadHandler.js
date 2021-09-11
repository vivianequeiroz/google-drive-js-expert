import Busboy from "busboy";
import { pipeline } from "stream/promises";
import fs from "fs";

export default class UploadHandler {
  constructor({ io, socketIo, downloadsFolder }) {
    (this.io = io),
      (this.socketIo = socketIo),
      (this.downloadsFolder = downloadsFolder);
  }

  handleFileBytes() {}

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
