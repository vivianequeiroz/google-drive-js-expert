import { describe, test, expect, jest } from "@jest/globals";
import fs from 'fs'
import FileHelper from '../../src/fileHelper.js'
import Routes from "./../../src/routes.js";

describe("#FileHelper test suite", () => {
  describe("#getFileStatus", () => {
    test("it should return file statuses in correct format", async () => {
      const statMock = {
        dev: 16777221,
        mode: 33188,
        nlink: 1,
        uid: 501,
        gid: 20,
        rdev: 0,
        blksize: 4096,
        ino: 49150349,
        size: 7213,
        blocks: 16,
        atimeMs: 1631045544985.3433,
        mtimeMs: 1631045501437,
        ctimeMs: 1631045501812.531,
        birthtimeMs: 1631045471686.1643,
        atime: "2021-09-07T20:12:24.985Z",
        mtime: "2021-09-07T20:11:41.437Z",
        ctime: "2021-09-07T20:11:41.813Z",
        birthtime: "2021-09-07T20:11:11.686Z",
      };

      const mockUser = "vivianequeiroz";
      process.env.USER = mockUser;

      const filename = 'file.png';

      jest.spyOn(fs.promises, fs.promises.readdir.name)
          .mockResolvedValue([filename]);

          jest.spyOn(fs.promises, fs.promises.stat.name)
          .mockResolvedValue(statMock);

      const result = await FileHelper.getFileStatus("/temp")

      const expectedResults = [
        {
          size: '7.21 kB',
          lastModified: statMock.birthtime,
          owner: mockUser,
          file: filename,
        },
      ];

      expect(fs.promises.stat).toHaveBeenCalledWith(`/temp/${filename}`);
      expect(result).toMatchObject(expectedResults);
    });
  });
});
