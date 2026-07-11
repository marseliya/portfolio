// be/routes/ProjectRoutes.js
import express from "express";
import {
    getProject,
    getProjectById,
    createProject,
    updateProject,
    deleteProject
} from "../controllers/ProjectCtrl.js";
import { uploadThumbnail, handleMulterError } from "../middleware/upload.js";

const router = express.Router();

router.get("/", getProject);
router.get("/:id", getProjectById);
router.post("/", uploadThumbnail, handleMulterError, createProject);  // ← TAMBAH UPLOAD
router.put("/:id", uploadThumbnail, handleMulterError, updateProject);
router.delete("/:id", deleteProject);

export default router;