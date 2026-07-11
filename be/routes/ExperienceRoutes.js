// be/routes/ExperienceRoutes.js
import express from "express";
import {
    getExperience,
    getExperienceById,
    createExperience,
    updateExperience,
    deleteExperience
} from "../controllers/ExperienceCtrl.js";

const router = express.Router();

router.get("/", getExperience);
router.get("/:id", getExperienceById);
router.post("/", createExperience);  // ← HAPUS /create
router.put("/:id", updateExperience);
router.delete("/:id", deleteExperience);

export default router;