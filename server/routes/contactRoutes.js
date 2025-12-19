import express from "express";
import ContactMessage from "../models/ContactMessage.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    console.log("REQ BODY ->", req.body); // debug line

    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const savedMessage = await ContactMessage.create({ name, email, message });

    return res.status(201).json({
      success: true,
      message: "Message received successfully",
      data: savedMessage,
    });
  } catch (err) {
    console.error("CONTACT POST ERROR:", err);
    return res
      .status(500)
      .json({ message: "Server error sending message", error: err.message });
  }
});

export default router;
