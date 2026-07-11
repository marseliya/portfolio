// be/controllers/ProfileController.js
import pool from "../config/db.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// GET ALL
export const getProfile = async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM profile ORDER BY id ASC"
        );
        res.status(200).json(result.rows);
    } catch (error) {
        console.error("ERROR:", error.message);
        res.status(500).json({ message: error.message });
    }
};

// GET BY ID
export const getProfileById = async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM profile WHERE id = $1",
            [req.params.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Profile tidak ditemukan" });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error("ERROR:", error.message);
        res.status(500).json({ message: error.message });
    }
};

// CREATE dengan upload foto
export const createProfile = async (req, res) => {
    try {
        const {
            nama,
            email,
            ttl,
            nomor_hp,
            alamat,
            bio,
            linkedin,
            github,
            porto
        } = req.body;

        let foto_profile = null;
        
        // Jika ada file yang diupload
        if (req.file) {
            foto_profile = req.file.filename;
        }

        const result = await pool.query(
            `
            INSERT INTO profile
            (nama, email, ttl, nomor_hp, foto_profile, alamat, bio, linkedin, github, porto)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            RETURNING *
            `,
            [nama, email, ttl, nomor_hp, foto_profile, alamat, bio, linkedin, github, porto]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("ERROR:", error.message);
        res.status(500).json({ message: error.message });
    }
};

// UPDATE dengan upload foto
export const updateProfile = async (req, res) => {
    try {
        const {
            nama,
            email,
            ttl,
            nomor_hp,
            alamat,
            bio,
            linkedin,
            github,
            porto
        } = req.body;

        let foto_profile = null;
        
        if (req.file) {
            // Hapus foto lama
            const oldProfile = await pool.query(
                "SELECT foto_profile FROM profile WHERE id = $1",
                [req.params.id]
            );
            
            if (oldProfile.rows[0]?.foto_profile) {
                const oldPhotoPath = path.join(__dirname, "../uploads/profile", oldProfile.rows[0].foto_profile);
                if (fs.existsSync(oldPhotoPath)) {
                    fs.unlinkSync(oldPhotoPath);
                }
            }
            
            foto_profile = req.file.filename;
        }

        const result = await pool.query(
            `
            UPDATE profile
            SET
                nama = $1,
                email = $2,
                ttl = $3,
                nomor_hp = $4,
                foto_profile = COALESCE($5, foto_profile),
                alamat = $6,
                bio = $7,
                linkedin = $8,
                github = $9,
                porto = $10,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $11
            RETURNING *
            `,
            [nama, email, ttl, nomor_hp, foto_profile, alamat, bio, linkedin, github, porto, req.params.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Profile tidak ditemukan" });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error("ERROR:", error.message);
        res.status(500).json({ message: error.message });
    }
};

// DELETE
export const deleteProfile = async (req, res) => {
    try {
        // Ambil foto profile untuk dihapus
        const profile = await pool.query(
            "SELECT foto_profile FROM profile WHERE id = $1",
            [req.params.id]
        );

        if (profile.rows[0]?.foto_profile) {
            const photoPath = path.join(__dirname, "../uploads/profile", profile.rows[0].foto_profile);
            if (fs.existsSync(photoPath)) {
                fs.unlinkSync(photoPath);
            }
        }

        await pool.query(
            "DELETE FROM profile WHERE id = $1",
            [req.params.id]
        );

        res.status(200).json({ message: "Profile berhasil dihapus" });
    } catch (error) {
        console.error("ERROR:", error.message);
        res.status(500).json({ message: error.message });
    }
};