import { Router } from "express";
import { getUrl, goto_url } from "../controller/urls";
const router = Router();

router.get("/", (req, res) => {
  res.send("Hello World");
});
router.post("/get", getUrl);
router.get("/:shorted_url", goto_url);
export default router;
