import { describe, test, expect, jest } from "@jest/globals";
import Routes from "../../src/routes.js";
import UploadHandler from "../../src/uploadHandler.js";
import fs from "fs";
import TestUtil from "../util/testUtil.js";

describe("#UploadHandler test suite", () => {
  const ioObj = {
    to: (id) => ioObj,
    emit: (event, message) => {},
  };

  describe("#registerEvents", () => {
    test("should call onFile and onFinish functions on Bysboy instance", () => {
      const uploadHandler = new UploadHandler({
        io: ioObj,
        socketId: "01",
      });

      jest.spyOn(uploadHandler, uploadHandler.onFile.name).mockResolvedValue();

      const headers = {
        "content-type": "multipart/form-data; boundary=",
      };

      const onFinish = jest.fn();
      const busboyInstance = uploadHandler.registerEvents(headers, onFinish);

      const fileStream = TestUtil.generateReadableStream([
        "chunk",
        "of",
        "data",
      ]);
      busboyInstance.emit("file", "fieldname", fileStream, "filename.txt");

      busboyInstance.listeners("finish")[0].call();

      expect(uploadHandler.onFile).toHaveBeenCalled();
      expect(onFinish).toHaveBeenCalled();
    });
  });

  describe("#onFile", () => {
    test("given a stream file it should save it on disk", async () => {
      const chunks = ["hey", "dyde"];
      const downloadsFolder = "/temp";
      const handler = new UploadHandler({
        io: ioObj,
        socketId: "01",
        downloadsFolder,
      });

      const onData = jest.fn();

      jest
        .spyOn(fs, fs.createWriteStream.name)
        .mockImplementation(() => TestUtil.generateWritableStream(onData));
    });
  });
});
