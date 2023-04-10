import {
    existsSync,
    open,
    unlinkSync,
    readFile,
    readFileSync,
    writeFileSync,
    renameSync,
} from "fs";

export const createfile = async (req, res) => {
    try {
        const { path, name } = req.params;
        const exist = existsSync(`drive/${path}/${name}`);

        if (exist)
            return res
                .status(400)
                .json({ msg: "File already found with the same name" });

        await open(`drive/${path}/${name}`, "w", (error, f) => {
            if (error) throw error;
            console.log(f);
            return res.status(200).json({});
        });
    } catch (error) {}
};

export const readfile = async (req, res) => {
    try {
        const { path, name } = req.params;
        const exist = existsSync(`drive/${path}/${name}`);

        if (!exist)
            return res.status(400).json({ msg: "File doesn't exist..." });

        const data = readFileSync(`drive/${path}/${name}`, {
            encoding: "utf-8",
            flag: "r",
        });

        return res.status(200).json({ data: data });
    } catch (error) {}
};

export const deletefile = async (req, res) => {
    try {
        const { path, name } = req.params;
        const exist = existsSync(`drive/${path}/${name}`);

        if (!exist)
            return res.status(400).json({ msg: "File doesn't exist..." });

        const fileDeleted = unlinkSync(`drive/${path}/${name}`);
        console.log(fileDeleted);
    } catch (error) {}
};

export const savefile = async (req, res) => {
    try {
        const { path, name } = req.params;
        const { data } = req.body;
        const filePath = `drive/${path}/${name}`;
        const exist = existsSync(filePath);

        if (!exist) return res.status(400).json({ msg: "File doesn't exist" });

        const fileSaved = writeFileSync(filePath, data, { flag: "w+" });
        console.log(fileSaved);

        return res.status(200).json({});
    } catch (error) {
        console.log(error);
    }
};

export const renamefile = async (req, res) => {
    try {
        const { path, name } = req.params;
        const { newname } = req.body;
        const filePath = `drive/${path}/${name}`;
        const exist = existsSync(filePath);

        if (!exist) return res.status(400).json({ msg: "File doesn't exist" });

        const fileRenamed = renameSync(filePath, `drive/${path}/${newname}`);
        console.log(fileRenamed);
        return res.status(200).json({});
    } catch (error) {}
};
