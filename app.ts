//basic configuration to start express server
import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import router from "./router";
import fileUpload from "express-fileupload";
import cors from "cors";


export const app = express();
const corsOptions = { origin: "*" };

app.use(bodyParser.json());
app.use(
  fileUpload({
    createParentPath: true,
  })
);
app.use(cors(corsOptions));
app.use(router);
// app.use((error: any, req: Request, res: Response, next: NextFunction) => {
//   if (error.toJSON) {
//     // console.log("ERRORJSON ->", error.toJSON);
//     return res.status(error.statusCode || 500).json(error.toJSON());
//   }

//   // console.log("ERROR -> ", error);

//   return res.status(error.statusCode || 500).json(error);
// });

const port = process.env.PORT || 5010;
app.listen(port, () => console.log(`Listening on port ${port}...`));
app.use(express.static("public"));
