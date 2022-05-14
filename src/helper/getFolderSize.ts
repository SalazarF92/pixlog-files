import path from "path";
import fs from "fs";

export default async function getFolderSize(dirPath) {
  const files = fs.readdirSync(dirPath);

  let totalSize = 0;

  files.forEach((file) => {
   const result =  fs.statSync(path.join(dirPath, file));
   totalSize = totalSize + result.size;
  });

  return [totalSize/1024/1024, files.length];
}
