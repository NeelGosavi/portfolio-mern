import express from "express";
import Skill from "../models/Skill.js";

const router = express.Router();

// GET /api/skills - get all skills
router.get("/", async (req, res) => {
  try {
    const skills = await Skill.find().sort({ category: 1, name: 1 });
    res.json(skills);
  } catch (err) {
    console.error("Error fetching skills:", err);
    res.status(500).json({ message: "Server error fetching skills" });
  }
});

export default router;
