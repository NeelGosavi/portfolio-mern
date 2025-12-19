import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    techStack: [{ type: String }], // ["React", "Node", "MongoDB"]
    githubUrl: { type: String },
    liveUrl: { type: String },
    imageUrl: { type: String },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);
export default Project;
