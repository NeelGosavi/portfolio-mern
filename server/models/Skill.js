import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },           // e.g. "React"
    category: { type: String, required: true },       // e.g. "Frontend"
    level: { type: String, default: "Intermediate" }, // e.g. "Advanced"
  },
  { timestamps: true }
);

const Skill = mongoose.model("Skill", skillSchema);
export default Skill;
