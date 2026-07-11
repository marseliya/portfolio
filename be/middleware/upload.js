// be/middleware/upload.js
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ========== KONFIGURASI STORAGE ==========
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Tentukan folder berdasarkan field name
        let folder = "profile"; // default
        
        if (file.fieldname === "foto_profile") {
            folder = "profile";
        } else if (file.fieldname === "thumbnail" || file.fieldname === "gambar") {
            folder = "images";
        } else if (file.fieldname === "file") {
            folder = "images"; // fallback
        }
        
        const uploadPath = path.join(__dirname, "../uploads", folder);
        
        // Buat folder jika belum ada
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        // Buat nama file unik: timestamp + nama asli
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        const name = path.basename(file.originalname, ext);
        cb(null, uniqueSuffix + "-" + name + ext);
    }
});

// ========== FILTER FILE (HANYA GAMBAR) ==========
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp|svg/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error("Hanya file gambar yang diizinkan (jpeg, jpg, png, gif, webp, svg)"));
    }
};

// ========== UPLOAD MIDDLEWARE ==========

// 1. Upload foto profile
export const uploadProfilePhoto = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    fileFilter: fileFilter
}).single("foto_profile");

// 2. Upload thumbnail project
export const uploadThumbnail = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: fileFilter
}).single("thumbnail");

// 3. Upload gambar certificate
export const uploadCertificateImage = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: fileFilter
}).single("gambar");

// 4. Upload generic (untuk field "file")
export const uploadFile = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: fileFilter
}).single("file");

// 5. Upload multiple files (untuk gallery)
export const uploadGallery = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: fileFilter
}).array("gambar", 10); // max 10 files

// ========== ERROR HANDLER ==========
export const handleMulterError = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === "FILE_TOO_LARGE") {
            return res.status(400).json({ 
                success: false,
                message: "Ukuran file terlalu besar (maksimal 5MB)" 
            });
        }
        if (err.code === "LIMIT_UNEXPECTED_FILE") {
            return res.status(400).json({ 
                success: false,
                message: "Field name tidak sesuai" 
            });
        }
        return res.status(400).json({ 
            success: false,
            message: err.message 
        });
    }
    if (err) {
        return res.status(400).json({ 
            success: false,
            message: err.message 
        });
    }
    next();
};