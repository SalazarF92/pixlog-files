import { Router } from "express";
import { userService } from "../services/userService";
import { fileService } from "../services/fileService";

const router = Router();

router.post("/create/:username/:password", async (req, res) => {
  try {
    const file = req.files;
    const data = req.params;

    if (!file) {
      res.status(400).send("No files were found!.");
    } else {
      if (file.file == undefined) {
        res.status(400).send("The key of form-data file must be 'file'");
      } else {
        const result = await fileService.createFile(data, file);
        console.log(result)
        return res.json(result);
      }
    }
  } catch (err) {
    return res.status(400).send({ error: err.message });
  }
});

router.get("/files/:username", async (req, res) => {
  try {
    const data = req.params
    const result = await fileService.userFiles(data);
    res.json(result);
  } catch (err) {
    res.json({ error: err.message });
  }
})



export default router;
