import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer"; // 1. Import Nodemailer
import connectDB from "./config/db.js";

import projectRoutes from "./routes/projectRoutes.js";
import skillRoutes from "./routes/skillRoutes.js";
// Removed contactRoutes import to handle functionality directly here

dotenv.config();

const app = express();

// 🔴 these must be BEFORE routes
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.get("/", (req, res) => {
  res.send("Portfolio API Running...");
});

// routes
app.use("/api/projects", projectRoutes);
app.use("/api/skills", skillRoutes);

// 2. Contact Route Logic (Added directly here)
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // Use SSL/TLS
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      connectionTimeout: 10000, 
    });

    // ADD THIS: Verify the connection configuration
    transporter.verify(function (error, success) {
      if (error) {
        console.error("❌ Email server connection error:", error);
      } else {
        console.log("✅ Email server is ready to take our messages");
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Sends the email to yourself
      replyTo: email,
      subject: `Portfolio Contact from: ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Email sent!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, error: "Failed to send email" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));