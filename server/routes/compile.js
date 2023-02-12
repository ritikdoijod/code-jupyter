import express from "express";
import { compile } from "../controllers/compile.js";

const router = express.Router();

router.post("/", compile);

export default router;
