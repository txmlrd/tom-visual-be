const express = require("express");
const router = express.Router();
const { addProject, updateProject, deleteProject, getProjectById } = require("../controllers/projectController");
const { upload, addProjectImage } = require("../controllers/projectImageController");

router.post("/add-project", addProject);
router.post("/:projectId/image", upload.single("image"), addProjectImage);
router.patch("/update/:id", updateProject);
router.delete("/delete/:id", deleteProject);
router.get("/:id", getProjectById);

module.exports = router;
