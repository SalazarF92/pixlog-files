import { Router } from "express";
import { userService } from "../services/userService";

const router = Router();

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  return await userService.getUser(id);
});

router.get("/current-user/:username/:password", async (req, res) => {
  try {
    const data = req.params;
    const result = await userService.checkUser(data);
    res.json(result)
  } catch (err) {
    res.json({ error: err.message });
  }
});

router.post("/create", async (req, res) => {
  try {
    const data = req.body;
    const result = await userService.createUser(data);

    res.json(result)

  } catch (err) {
    res.json({ error: err.message });
  }
});

export default router;
