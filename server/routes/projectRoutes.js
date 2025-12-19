import express from "express";
import Project from "../models/Project.js";

const router = express.Router();

// GET /api/projects - get all projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    console.error("Error fetching projects:", err);
    res.status(500).json({ message: "Server error fetching projects" });
  }
});

export default router;
