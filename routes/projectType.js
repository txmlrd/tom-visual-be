const express = require("express");
const router = express.Router();
const { getAllProjectTypes, getProjectTypeById } = require("../controllers/projectTypeController");

router.get("/", getAllProjectTypes);
router.get("/:id", getProjectTypeById);

module.exports = router;
