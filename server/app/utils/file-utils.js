const path = require("path");
const glob = require("glob");

module.exports = {
    getSameFileNames: fileName => {
        return new Promise((resolve, reject) => {
            glob(path.resolve(fileName) + ".*", null, (err, files) => {
                console.log({ fileName, files });
                if (err) return reject(err);
                resolve(files);
            });
        });
    }
};
