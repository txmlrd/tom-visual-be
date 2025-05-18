
const ProjectType = require("../models/ProjectType");


async function getAllProjectTypes(req, res) {
  try {
    const projectTypes = await ProjectType.findAll();
    res.status(200).json(projectTypes);
  } catch (err) {
    res.status(500).json({ message: "Error fetching project types", error: err.message });
  }
}

async function getProjectTypeById(req, res) {
  const { id } = req.params;
  try {
    const projectType = await ProjectType.findByPk(id);
    if (!projectType) {
      return res.status(404).json({ message: "Project type not found" });
    }
    res.status(200).json(projectType);
  } catch (err) {
    res.status(500).json({ message: "Error fetching project type", error: err.message });
  }
}

module.exports = { getAllProjectTypes, getProjectTypeById };
