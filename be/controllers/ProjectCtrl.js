import pool from "../config/db.js";
import fs from "fs";        // ← TAMBAHKAN INI
import path from "path";    // ← TAMBAHKAN INI
import { fileURLToPath } from "url";  // ← TAMBAHKAN INI

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// be/controllers/ProjectCtrl.js

// ========== GET PROJECT BY ID ==========
export const getProjectById = async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM project WHERE id = $1",
            [req.params.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Project tidak ditemukan"
            });
        }

        // 🔥 FORMAT ulang - parse teknologi ke array
        const project = result.rows[0];
        if (project.teknologi && typeof project.teknologi === 'string') {
            try {
                project.teknologi = JSON.parse(project.teknologi);
            } catch {
                project.teknologi = project.teknologi.split(',').map(t => t.trim());
            }
        }

        res.status(200).json(project);

    } catch (error) {
        console.error("ERROR:", error.message);
        res.status(500).json({
            message: error.message
        });
    }
};

// be/controllers/ProjectCtrl.js

// ========== HELPER: Parse teknologi dengan benar ==========
const parseTechnologies = (teknologi) => {
    if (!teknologi) return null;
    
    // Jika sudah array, return as-is
    if (Array.isArray(teknologi)) {
        return teknologi;
    }
    
    // Jika string, coba parse
    if (typeof teknologi === 'string') {
        // Coba parse JSON
        try {
            const parsed = JSON.parse(teknologi);
            if (Array.isArray(parsed)) {
                return parsed;
            }
        } catch (e) {
            // Jika gagal, split by comma
            return teknologi.split(',').map(t => t.trim()).filter(t => t !== '');
        }
    }
    
    return null;
};

// ========== GET ALL PROJECTS ==========
export const getProject = async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM project ORDER BY id ASC"
        );

        // 🔥 Format response - konversi array ke format yang benar
        const projects = result.rows.map(project => {
            if (project.teknologi) {
                // Jika masih string, parse
                if (typeof project.teknologi === 'string') {
                    try {
                        project.teknologi = JSON.parse(project.teknologi);
                    } catch {
                        project.teknologi = project.teknologi.split(',').map(t => t.trim());
                    }
                }
                // Jika array, bersihkan dari elemen yang tidak valid
                if (Array.isArray(project.teknologi)) {
                    project.teknologi = project.teknologi
                        .map(t => {
                            if (typeof t === 'string') {
                                // Hapus kutipan berlebih
                                return t.replace(/^"|"$/g, '').replace(/^'|'$/g, '');
                            }
                            return t;
                        })
                        .filter(t => t && t !== '""' && t !== "''" && t !== '');
                }
            }
            return project;
        });

        res.status(200).json(projects);

    } catch (error) {
        console.error("ERROR:", error.message);
        res.status(500).json({
            message: error.message
        });
    }
};

// ========== CREATE PROJECT ==========
export const createProject = async (req, res) => {
    try {
        const {
            judul,
            deskripsi,
            kategori,
            demo_url,
            github_url,
            teknologi,
            status,
            tanggal_mulai,
            tanggal_selesai
        } = req.body;

        let thumbnail = null;
        if (req.file) {
            thumbnail = req.file.filename;
        }

        // 🔥 Parse teknologi dengan benar
        let teknologiArray = parseTechnologies(teknologi);

        const result = await pool.query(
            `
            INSERT INTO project
            (judul, deskripsi, kategori, thumbnail, demo_url, github_url, teknologi, status, tanggal_mulai, tanggal_selesai)
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
            RETURNING *
            `,
            [judul, deskripsi, kategori, thumbnail, demo_url, github_url, teknologiArray, status, tanggal_mulai, tanggal_selesai]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("ERROR:", error.message);
        res.status(500).json({ message: error.message });
    }
};

// ========== UPDATE PROJECT ==========
export const updateProject = async (req, res) => {
    try {
        const {
            judul,
            deskripsi,
            kategori,
            demo_url,
            github_url,
            teknologi,
            status,
            tanggal_mulai,
            tanggal_selesai
        } = req.body;

        let thumbnail = null;
        
        if (req.file) {
            const oldProject = await pool.query(
                "SELECT thumbnail FROM project WHERE id = $1",
                [req.params.id]
            );
            
            if (oldProject.rows[0]?.thumbnail) {
                const oldPath = path.join(__dirname, "../uploads/images", oldProject.rows[0].thumbnail);
                if (fs.existsSync(oldPath)) {
                    fs.unlinkSync(oldPath);
                }
            }
            
            thumbnail = req.file.filename;
        }

        // 🔥 Parse teknologi dengan benar
        let teknologiArray = parseTechnologies(teknologi);

        const result = await pool.query(
            `
            UPDATE project
            SET
                judul = $1,
                deskripsi = $2,
                kategori = $3,
                thumbnail = COALESCE($4, thumbnail),
                demo_url = $5,
                github_url = $6,
                teknologi = $7,
                status = $8,
                tanggal_mulai = $9,
                tanggal_selesai = $10,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $11
            RETURNING *
            `,
            [judul, deskripsi, kategori, thumbnail, demo_url, github_url, teknologiArray, status, tanggal_mulai, tanggal_selesai, req.params.id]
        );

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error("ERROR:", error.message);
        res.status(500).json({ message: error.message });
    }
};

// DELETE - hapus file juga
export const deleteProject = async (req, res) => {
    try {
        const project = await pool.query(
            "SELECT thumbnail FROM project WHERE id = $1",
            [req.params.id]
        );

        if (project.rows[0]?.thumbnail) {
            const filePath = path.join(__dirname, "../uploads/images", project.rows[0].thumbnail);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }

        await pool.query("DELETE FROM project WHERE id = $1", [req.params.id]);
        res.status(200).json({ message: "Project berhasil dihapus" });
    } catch (error) {
        console.error("ERROR:", error.message);
        res.status(500).json({ message: error.message });
    }
};