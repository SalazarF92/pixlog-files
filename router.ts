import * as express from "express";
import fileRouter from "./src/routes/fileRouter";
import  userRouter  from "./src/routes/userRouter";

const router = express.Router();

router.use("/user", userRouter);
router.use("/file", fileRouter);


router.get("/", (req, res) => {
    res.json({
      pixlog: "1.0",
    });
  });

export default router;
