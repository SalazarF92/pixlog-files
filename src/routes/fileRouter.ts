import { Router } from "express";
import { fileService } from "../services/fileService";

const router = Router();


router.post("/create/:username/:password", async (req, res) => {
  try {
    const file = req.files;
    const data = req.params;

    const result = await fileService.createFile(data, file);

    return res.json(result);

  } catch (err) {
    throw err;
  }
});

export default router;
