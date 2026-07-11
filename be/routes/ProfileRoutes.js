// be/routes/ProfileRoutes.js
import express from "express";
import {
    getProfile,
    getProfileById,
    createProfile,
    updateProfile,
    deleteProfile
} from "../controllers/ProfileCtrl.js";
import { uploadProfilePhoto, handleMulterError } from "../middleware/upload.js";

const router = express.Router();

router.get("/", getProfile);
router.get("/:id", getProfileById);
router.post("/", uploadProfilePhoto, handleMulterError, createProfile);  // ← TAMBAH UPLOAD
router.put("/:id", uploadProfilePhoto, handleMulterError, updateProfile);
router.delete("/:id", deleteProfile);

export default router;