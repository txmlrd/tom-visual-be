const path = require("path");
const fs = require("fs");
const multer = require("multer");
const Project = require("../models/Project");

// Setup multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = path.join(__dirname, "..", "storage", "projectImages");
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const projectId = req.params.projectId;
    cb(null, `${projectId}.jpg`);
  },
});

const upload = multer({ storage });

// Fungsi handler untuk upload dan simpan path ke DB
async function addProjectImage(req, res) {
  try {
    const { projectId } = req.params;

    if (!req.file) {
      return res.status(400).json({ message: "Image file is required" });
    }

    const project = await Project.findByPk(projectId);
    if (!project) {
      // Hapus file jika project tidak ditemukan
      fs.unlinkSync(req.file.path);
      return res.status(404).json({ message: "Project not found" });
    }

    // Simpan path relatif ke DB
    project.mainImage = path.join("storage", "projectImages", req.file.filename);
    await project.save();

    res.status(200).json({ message: "Image added successfully", project });
  } catch (err) {
    res.status(500).json({ message: "Error adding image", error: err.message });
  }
}

module.exports = { upload, addProjectImage };
