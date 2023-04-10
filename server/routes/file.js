import express from "express";
import {
  createfile,
  readfile,
  deletefile,
  renamefile,
  savefile,
} from "../controllers/file.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/:path/:name", auth, createfile);
router.get("/:path/:name", auth, readfile);
router.delete("/:path", auth, deletefile);
router.patch("/:path/:name", savefile);
router.put("/:path/:name", renamefile);

export default router;
