import { Router } from "express";
import { userService } from "../services/userService";

const router = Router();


// router.get("/current-user/:username/:password", async (req, res) => {
//   try {
//     const data = req.params;
//     const result = await userService.checkUser(data);
//     return res.json(result);
//   } catch (err) {
//     return res.json({ error: err.message });
//   }
// });

router.get("/users", async (req, res) => {
  try {
    const result = await userService.getUsers();
    res.json(result);
  } catch (err) {
    res.json({ error: err.message });
  }
});

// router.post("/create", async (req, res) => {
//   try {
//     const data = req.body;
//     const result = await userService.createUser(data);

//     return res.json(result);
//   } catch (err) {
//     return res.json({ error: err.message });
//   }
// });

export default router;
