// be/routes/SkillRoutes.js
import express from "express";
import {
    getSkillsByProfile,
    getSkillById,
    createSkill,
    createManySkills,
    updateSkill,
    deleteSkill,
    deleteAllSkills
} from "../controllers/SkillCtrl.js";

const router = express.Router({ mergeParams: true });

router.get("/", getSkillsByProfile);
router.get("/:id", getSkillById);
router.post("/", createSkill);  // ← HAPUS /create
router.post("/create-many", createManySkills);
router.put("/:id", updateSkill);
router.delete("/delete-all", deleteAllSkills);
router.delete("/:id", deleteSkill);

export default router;