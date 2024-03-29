import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
// import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import compileRoutes from "./routes/compile.js";
import fileRoutes from "./routes/file.js";
import filesRoutes from "./routes/files.js";
import heRoutes from "./routes/he.js";

// configuration
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30md", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

//Routes
app.use("/auth", authRoutes);
app.use("/compile", compileRoutes);
app.use("/he", heRoutes);
app.use("/file", fileRoutes);
app.use("/files", filesRoutes);

//Mongoose setup
const PORT = process.env.PORT || 7000;
mongoose.set("strictQuery", false);
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        app.listen(PORT, () => console.log(`Server running on ${PORT}`));
    })
    .catch((error) => console.log(error));
