import { Users } from "../entity/Users";
import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import fs from "fs";

@EntityRepository(Users)
class FileRepository extends Repository<Users> {

  public async createFile(username, file) {
    const pathUser = `./files/${username as string}/${file.file.name}`;
    fs.writeFileSync(pathUser, file.file.data);

    return "success";
  }
}

export const fileRepository = getCustomRepository(FileRepository);
