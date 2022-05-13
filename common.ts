import * as crypto from "crypto";


export const calcHashedPassword = (plainPassword: string) => {
    const salt = crypto.randomBytes(16).toString("hex");
    const password = crypto
      .pbkdf2Sync(plainPassword, salt, 1000, 64, "sha512")
      .toString("hex");
  
    return {
      salt,
      password,
    };
  };

  export const validPassword = (
    plainPassword: string,
    hashedPassword: string,
    salt: string
  ) => {
    const hash = crypto
      .pbkdf2Sync(plainPassword, salt, 1000, 64, "sha512")
      .toString("hex");
  
    return hashedPassword === hash;
  };