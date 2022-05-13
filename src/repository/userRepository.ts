import { Users } from "../entity/Users";
import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { calcHashedPassword } from "../../common";
import { IUser } from "../interface/IUser";

@EntityRepository(Users)
class UserRepository extends Repository<Users> {
  public async getUser(id: string): Promise<Users> {
    // console.log('result', id);
    // const entityManager = getManager();
    // const data = await entityManager.query(
    //   `SELECT * FROM users WHERE id = $1`,
    //   [id],
    // );

    // return data;

    return this.findOne(id);
  }

  public async checkUser(
    username: string,
    password: string,
    salt: string
  ): Promise<Users> {
    return this.findOne({ username, password, salt });
  }

  public async validUser(username: string): Promise<Users> {
    const user = await this.findOne({ username });
    if (user == undefined || user == null) {
      return null;
    } else return user;
  }

  public async createUser(data) {
    const { password, salt } = calcHashedPassword(data.password);
    data.password = password;
    data.salt = salt;

    return this.save(data);
  }
}

export const userRepository = getCustomRepository(UserRepository);
