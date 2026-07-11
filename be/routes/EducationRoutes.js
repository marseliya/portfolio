// be/routes/EducationRoutes.js
import express from "express";
import {
    getEducation,
    getEducationById,
    createEducation,
    updateEducation,
    deleteEducation
} from "../controllers/EducationCtrl.js";

const router = express.Router();

// ✅ STANDARD REST API
router.get("/", getEducation);
router.get("/:id", getEducationById);
router.post("/", createEducation);  // ← HAPUS /create
router.put("/:id", updateEducation);    
router.delete("/:id", deleteEducation);  

export default router;