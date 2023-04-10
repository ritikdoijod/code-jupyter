import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { mkdir, rmdir } from "fs";
import User from "../models/User.js";

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const user = await User.findOne({ username: username });

        if (user) return res.status(400).json({ msg: "User already exist..." });

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        await mkdir(`drive/${username}`, (error) => {
            if (error) throw error;
        });

        const newUser = await new User({
            username,
            email,
            password: passwordHash,
        });

        const savedUser = await newUser.save();

        if (!savedUser) {
            rmdir(`drive/${username}`, (error) => {
                if (error) throw error;
            })
            
            return res.status(400).json({ msg: "Something went wrong..." });
        }

        const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET);
        delete savedUser.password;
        console.log(savedUser);
        res.status(201).json({ token, user: savedUser });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username: username });

        if (!user)
            return res.status(400).json({ msg: "User does not exists..." });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ msg: "Invalid credentials" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({ token, user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
