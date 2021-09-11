import { Readable } from "stream";

export default class TestUtil {
  //receives an array
  static generateReadableStream(data) {
    return new Readable({
      objectMode: true,
      read() {
        for (const item of data) {
          this.push(item);
        }
        // to inform that the content was completely delivered
        this.push(null);
      },
    });
  }

  static generateWritableStream(data) {
    return new Writable({
      objectMode: true,
      write(chunk, encoding, cb) {
        onData(chunk);
        cb(null, chunk);
      },
    });
  }
}
