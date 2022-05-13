import { validPassword } from "../../common";
import { userRepository } from "../repository/userRepository";
import fs from "fs";
import path from "path";
import { fileRepository } from "../repository/fileRepository";
import getFolderSize from "../helper/getFolderSize";

class FileService {
  getUser(id: string) {
    return userRepository.getUser(id);
  }

  async checkFileExists(file) {
    if (!fs.existsSync(file)) {
      return false;
    } else return true;
  }

  async checkFolderSize(username: string, pathUser: string) {
    const path = `./files`;
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    }

    if (!fs.existsSync(pathUser)) {
      fs.mkdirSync(pathUser);
    }
    // const file = fs.readdirSync(`./files/${username}`);

    const allFiles = await getFolderSize(`./files/${username}`);

    return allFiles;
  }

  async createFile(data, file) {
    const pathUser = `./files/${data.username}`;

    const resultHash = await userRepository.validUser(data.username);
    if (resultHash != undefined && resultHash != null) {
      const checkValid = validPassword(
        data?.password,
        resultHash?.password,
        resultHash?.salt
      );
      if (checkValid) {
        const validPass = await userRepository.checkUser(
          data?.username,
          resultHash?.password,
          resultHash?.salt
        );
        const fileExists = await this.checkFileExists(
          pathUser + "/" + file.file.name
        );
        const checkFolderSize = await this.checkFolderSize(
          data.username,
          pathUser
        );
        const currentFileSize = file.file.size / 1000000;

        if (checkFolderSize < 300 && !fileExists && currentFileSize < 100) {
          const result = await fileRepository.createFile(data.username, file);
          return result
        } else {
          throw Error("Your folder is full, file already exists or file is over 100Mb")
        }
      } else {
        throw Error("Invalid password")
      }
    } else {
      throw Error("Invalid username or password");
    }
  }
}

export const fileService = new FileService();
