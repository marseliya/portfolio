// be/server.js atau index.js
import express from "express";
import cors from "cors";
import pool from "./config/db.js";
import path from "path";
import { fileURLToPath } from "url";

// Import semua routes
import ProfileRoutes from "./routes/ProfileRoutes.js";
import EducationRoutes from "./routes/EducationRoutes.js";
import ExperienceRoutes from "./routes/ExperienceRoutes.js";
import ProjectRoutes from "./routes/ProjectRoutes.js";
import CertificateRoutes from "./routes/CertificateRoutes.js";
import ContactRoutes from "./routes/ContactRoutes.js";
import SkillRoutes from "./routes/SkillRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ CORS
app.use(cors({
  origin: 'http://localhost:5173', // Ganti dengan port frontend kamu
  credentials: true,
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (untuk gambar)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ REGISTER SEMUA ROUTES
app.use("/api/profile", ProfileRoutes);
app.use("/api/education", EducationRoutes);
app.use("/api/experience", ExperienceRoutes);
app.use("/api/project", ProjectRoutes);
app.use("/api/certificate", CertificateRoutes);
app.use("/api/contact", ContactRoutes);
app.use("/api/profile/:profileId/skills", SkillRoutes);

// ✅ LIST ALL ROUTES FOR DEBUGGING
console.log("\n📋 Registered Routes:");
console.log("✅ GET  /api/profile");
console.log("✅ POST /api/profile (with upload)");
console.log("✅ PUT  /api/profile/:id (with upload)");
console.log("✅ DELETE /api/profile/:id");
console.log("✅ GET  /api/education");
console.log("✅ POST /api/education");
console.log("✅ PUT  /api/education/:id");
console.log("✅ DELETE /api/education/:id");
console.log("✅ GET  /api/experience");
console.log("✅ POST /api/experience");
console.log("✅ PUT  /api/experience/:id");
console.log("✅ DELETE /api/experience/:id");
console.log("✅ GET  /api/project");
console.log("✅ POST /api/project (with upload)");
console.log("✅ PUT  /api/project/:id (with upload)");
console.log("✅ DELETE /api/project/:id");
console.log("✅ GET  /api/certificate");
console.log("✅ POST /api/certificate (with upload)");
console.log("✅ PUT  /api/certificate/:id (with upload)");
console.log("✅ DELETE /api/certificate/:id");
console.log("✅ GET  /api/contact");
console.log("✅ POST /api/contact");
console.log("✅ DELETE /api/contact/:id");
console.log("✅ GET  /api/profile/:profileId/skills");

app.get("/", (req, res) => {
    res.json({ 
        message: "API Portfolio Running",
        endpoints: [
            "/api/profile",
            "/api/education",
            "/api/experience",
            "/api/project",
            "/api/certificate",
            "/api/contact",
            "/api/profile/:profileId/skills"
        ]
    });
});

// ✅ Test database connection
app.get("/api/test-db", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");
        res.json({ 
            success: true, 
            timestamp: result.rows[0].now,
            message: "Database connected!"
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`\n🚀 Server running on http://localhost:${PORT}`);
    console.log(`📁 Upload folder: ${path.join(__dirname, "uploads")}\n`);
});