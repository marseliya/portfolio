// be/routes/CertificateRoutes.js
import express from "express";
import {
    getCertificate,
    getCertificateById,
    createCertificate,
    updateCertificate,
    deleteCertificate
} from "../controllers/CertificateCtrl.js";
import { uploadCertificateImage, handleMulterError } from "../middleware/upload.js";

const router = express.Router();

router.get("/", getCertificate);
router.get("/:id", getCertificateById);
router.post("/", uploadCertificateImage, handleMulterError, createCertificate);
router.put("/:id", uploadCertificateImage, handleMulterError, updateCertificate);
router.delete("/:id", deleteCertificate);

export default router;