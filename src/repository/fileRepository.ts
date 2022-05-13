import { Users } from "../entity/Users";
import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import fs from "fs";

@EntityRepository(Users)
class FileRepository extends Repository<Users> {

  public async getUser(id: string): Promise<Users> {
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
    const result = await this.findOne({ username });
    return result;
  }

  public async createFile(username, file) {
    const pathUser = `./files/${username as string}/${file.file.name}`;
    fs.writeFileSync(pathUser, file.file.data);

    return "success";
  }
}

export const fileRepository = getCustomRepository(FileRepository);
