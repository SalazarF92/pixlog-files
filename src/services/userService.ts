import { validPassword } from "../../common";
import { IUser } from "../interface/IUser";
import { userRepository } from "../repository/userRepository";

class UserService {
  getUser(id: string) {
    return userRepository.getUser(id);
  }

  getUsers() {
    return userRepository.getUsers();
  }

  async checkAlreadyExists(username: string) {
    const result = await userRepository.validUser(username);
    console.log('alooou',result)
    if (result) {
      console.log("User already exists");
      return true;
    } else return false;
  }

  async checkUser(data: Partial<IUser>) {
    const result = await userRepository.validUser(data.username);
    if (result != undefined && result != null) {
      console.log(result)
      const checkValid = validPassword(
        data?.password,
        result?.password,
        result?.salt
      );
      if (checkValid) {
        const user = await userRepository.checkUser(
          data.username,
          result.password,
          result.salt
        );
        return user;
      }
    } else throw Error("Invalid username or password");
  }

  async createUser(data) {
    const alreadyExists = await this.checkAlreadyExists(data.username);
    if (!alreadyExists) {
      return userRepository.createUser(data);
    } else {
      throw Error("User already exists");
    }
  }
}

export const userService = new UserService();
