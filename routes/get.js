const express = require("express");
const router = express.Router();
const { getAllProjects, getAllProjectTypes } = require("../controllers/projectController");
const { getProjectImage } = require("../controllers/projectController");

router.get("/get-all-projects", getAllProjects);
router.get("/get-all-project-types", getAllProjectTypes);
router.get("/projects/:id/image", getProjectImage);

module.exports = router;
