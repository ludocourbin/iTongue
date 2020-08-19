const express = require("express");
const glob = require("glob");
const path = require("path");

const { PUBLIC_DIR } = require("../constants/index");

const router = express.Router();

router.use((req, res, next) => {
    const requestedFile = path.join(PUBLIC_DIR, req.baseUrl, req.path) + ".*";

    glob(path.resolve(requestedFile), null, (err, files) => {
        if (err) return next(err);
        if (files.length === 1) return res.sendFile(files[0]);
        next();
    });
});

module.exports = router;
