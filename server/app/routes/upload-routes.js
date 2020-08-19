const express = require("express");
const path = require("path");

const fileUtils = require("../utils/file-utils");

const { PUBLIC_DIR } = require("../constants/index");

const router = express.Router();

router.use(async (req, res, next) => {
    if (req.method !== "GET") return next();

    const reqFile = path.join(PUBLIC_DIR, req.baseUrl, req.path);

    try {
        const files = await fileUtils.getSameFileNames(reqFile);
        if (files.length === 1) return res.sendFile(files[0]);
        next();
    } catch (err) {
        next(err);
    }
});

module.exports = router;
