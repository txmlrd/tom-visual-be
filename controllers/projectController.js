const Project = require("../models/Project");
const ProjectType = require("../models/ProjectType");

async function getAllProjects(req, res) {
  try {
    const projects = await Project.findAll();
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ message: "Error fetching projects", error: err.message });
  }
}

async function getAllProjectTypes(req, res) {
  try {
    const projectTypes = await ProjectType.findAll();
    res.status(200).json(projectTypes);
  } catch (err) {
    res.status(500).json({ message: "Error fetching project types", error: err.message });
  }
}

async function addProject(req, res) {
  try {
    const { title, year, content, projectTypeId } = req.body;
    if (!title || !year || !content || !projectTypeId) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newProject = await Project.create({
      title,
      year,
      content,
      projectTypeId,
    });
    res.status(201).json({ message: "Project added successfully", project: newProject });
  } catch (err) {
    res.status(500).json({ message: "Error adding project", error: err.message });
  }
}

module.exports = { addProject, getAllProjectTypes, getAllProjects };
