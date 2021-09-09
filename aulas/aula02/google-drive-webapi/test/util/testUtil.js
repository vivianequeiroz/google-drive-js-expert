import { Readable } from "stream";

export default class TestUtil { //receives an array
  static generateReadableStream(data) {
    return new Readable({
      objectMode: true,
      async read() {
        for (const item of data) {
          this.push(item);
        }
        // to inform that the content was fully delivered
        this.push(null);
      },
    });
  }
}
