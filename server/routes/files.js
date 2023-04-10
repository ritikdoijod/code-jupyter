import express from "express";
import {read} from "../controllers/files.js"
import auth from "../middleware/auth.js"

const router = express.Router();

router.get("/:user", auth, read);

export default router;