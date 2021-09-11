import Busboy from "busboy";

export default class UploadHandler {
  constructor({ io, socketIo, downloadsFolder }) {
    (this.io = io),
      (this.socketIo = socketIo),
      (this.downloadsFolder = downloadsFolder);
  }

  onFile(fieldname, file, filename) {}

  registerEvents(headers, onFinish) {
    const busboy = new Busboy({ headers });
    busboy.on("file", this.onFile.bind(this));
    busboy.on("finish", onFinish);

    return busboy;
  }
}
