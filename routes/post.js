const express = require("express");
const router = express.Router();
const { addProject } = require("../controllers/projectController");

router.post("/add-project", addProject);
module.exports = router;
