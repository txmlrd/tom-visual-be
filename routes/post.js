const express = require("express");
const router = express.Router();
const { addProject } = require("../controllers/projectController");
const { upload, addProjectImage } = require("../controllers/projectImageController");

router.post("/add-project", addProject);
router.post("/projects/:projectId/image", upload.single("image"), addProjectImage);

module.exports = router;
