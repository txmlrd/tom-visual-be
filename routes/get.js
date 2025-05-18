const express = require("express");
const router = express.Router();
const { getAllProjects, getAllProjectTypes } = require("../controllers/projectController");

router.get("/get-all-projects", getAllProjects);
router.get("/get-all-project-types", getAllProjectTypes);

module.exports = router;
