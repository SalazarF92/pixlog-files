import { Router } from "express";
import { fileService } from "../services/fileService";

const router = Router();

router.post("/create/:username/:password", async (req, res) => {
  try {
    const file = req.files;
    const data = req.params;

    if (!file) {
      res.status(400).send("No files were found!.");
    } else {
      const result = await fileService.createFile(data, file);
      res.json(result);
    }
  } catch (err) {
    res.json({ error: err.message });;
  }
});

export default router;
