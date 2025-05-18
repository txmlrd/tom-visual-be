const express = require("express");
const router = express.Router();
const { getAllProjects } = require("../controllers/projectController");
const { getProjectImage } = require("../controllers/projectController");

router.get("/get-all-projects", getAllProjects);
router.get("/projects/:id/image", getProjectImage);

module.exports = router;
