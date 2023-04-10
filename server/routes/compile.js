import express from "express";
import { compile } from "../controllers/compile2.js";

const router = express.Router();

router.post("/", compile);

export default router;
