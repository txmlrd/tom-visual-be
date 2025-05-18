const Project = require("../models/Project");
const path = require("path");
const fs = require("fs");

async function getAllProjects(req, res) {
  try {
    const projects = await Project.findAll();
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ message: "Error fetching projects", error: err.message });
  }
}

async function getProjectById(req, res) {
  const { id } = req.params;
  try {
    const project = await Project.findByPk(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json(project);
  } catch (err) {
    res.status(500).json({ message: "Error fetching project", error: err.message });
  }
}

async function getProjectImage(req, res) {
  const { id } = req.params;
  const imagePath = path.join(__dirname, "../storage/projectImages", `${id}.jpg`);

  if (!fs.existsSync(imagePath)) {
    return res.status(404).json({ message: "Image not found" });
  }

  res.sendFile(imagePath);
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

async function updateProject(req, res) {
  try {
    const { id } = req.params;
    const { title, year, content, projectTypeId } = req.body;

    const project = await Project.findByPk(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Update hanya field yang dikirim (partial update)
    if (title !== undefined) project.title = title;
    if (year !== undefined) project.year = year;
    if (content !== undefined) project.content = content;
    if (projectTypeId !== undefined) project.projectTypeId = projectTypeId;

    await project.save();
    res.status(200).json({ message: "Project updated successfully", project });
  } catch (err) {
    res.status(500).json({ message: "Error updating project", error: err.message });
  }
}

async function deleteProject(req, res) {
  try {
    const { id } = req.params;
    const project = await Project.findByPk(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    await project.destroy();
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting project", error: err.message });
  }
}

module.exports = { addProject, getAllProjects, getProjectImage, updateProject, deleteProject, getProjectById };
