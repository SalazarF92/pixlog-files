import { validPassword } from '../../common';
import { IUser } from '../interface/IUser';
import { userRepository } from '../repository/userRepository';

class UserService {

  getUser(id: string) {
    return userRepository.getUser(id);
  }

  async checkUser(data: Partial<IUser>) {
    const result = await userRepository.validUser(data.username);
    const checkValid = validPassword(data?.password, result?.password, result?.salt);
    if (checkValid) {
      const user = await userRepository.checkUser(data.username, result.password, result.salt);
      console.log(user)
      return user;
    }
    else throw Error('Invalid username or password');
  } 

  createUser(data) {
    return userRepository.createUser(data);
  }
}

export const userService = new UserService();


