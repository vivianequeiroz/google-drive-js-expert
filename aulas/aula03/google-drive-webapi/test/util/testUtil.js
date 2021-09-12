import { Readable, Transform, Writable } from "stream";
import { jest } from "@jest/globals";
export default class TestUtil {
  static mockDateNow(mockImplementationPeriods) {
    const now = jest.spyOn(global.Date, global.Date.now.name);

    mockImplementationPeriods.forEach((time) => {
      now.mockReturnValueOnce(time);
    });
  }

  static getTimeFromDate(dateString) {
    return new Date(dateString).getTime();
  }

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

  static generateWritableStream(onData) {
    return new Writable({
      objectMode: true,
      write(chunk, encoding, cb) {
        onData(chunk);
        cb(null, chunk);
      },
    });
  }

  static generateTransformStream(onData) {
    return new Transform({
      objectMode: true,
      transform(chunk, encoding, cb) {
        onData(chunk);
        cb(null, chunk);
      },
    });
  }
}
