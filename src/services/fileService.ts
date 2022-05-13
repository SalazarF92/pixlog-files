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

  // async checkUser(data: Partial<IUser>) {
  //   const result = await userRepository.validUser(data.username);
  //   const checkValid = validPassword(data.password, result.password, result.salt);
  //   if (checkValid) {
  //     const user = await userRepository.checkUser(data.username, result.password, result.salt);
  //     console.log(user)
  //     return user;
  //   }
  //   else throw Error('Invalid username or password');
  // }

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
    const checkValid = validPassword(
      data?.password,
      resultHash?.password,
      resultHash?.salt
    );
    if (checkValid) {
      await userRepository.checkUser(
        data?.username,
        resultHash?.password,
        resultHash?.salt
      );
      const fileExists = await this.checkFileExists(pathUser+'/'+file.file.name);
      const checkFolderSize = await this.checkFolderSize(data.username, pathUser);
      const currentFileSize = file.file.size/1000000

      if (checkFolderSize < 300 && !fileExists && currentFileSize < 100) {
        await fileRepository.createFile(data.username, file);
      } else {
        return 'Your folder is full, file already exists or file is over 100Mb';
      }
    }
  }
}

export const fileService = new FileService();
