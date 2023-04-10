import { existsSync, readdirSync } from "fs";

export const read = (req, res) => {
    const { user } = req.params;
    try {
        const exist = existsSync(`drive/${user}/`);

        if (!exist)
            return res.status(400).json({ msg: "User directory not found" });

        const files = [];
        const data = readdirSync(`drive/${user}`, {withFileTypes: true});
        data.forEach((item) => {
            if (item.isFile()) {
                files.push(item);
            }
        });

        return res.status(200).json({ files: files });
    } catch (error) {}
};
