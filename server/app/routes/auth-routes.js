const express = require("express");

const authController = require("../controllers/auth-controller");

const router = express.Router();

router.post("/refresh", authController.refresh);

router.post("/refresh/invalidate", authController.invalidateRefreshToken);
router.post("/access/invalidate", authController.invalidateAccessToken);

module.exports = router;
