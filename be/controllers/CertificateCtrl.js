import pool from "../config/db.js";
import fs from "fs";        // ← TAMBAHKAN INI
import path from "path";    // ← TAMBAHKAN INI
import { fileURLToPath } from "url";  // ← TAMBAHKAN INI

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// GET ALL
export const getCertificate = async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM certificate ORDER BY id ASC"
        );

        res.status(200).json(result.rows);

    } catch (error) {
        console.error("ERROR:", error.message);

        res.status(500).json({
            message: error.message
        });

    }
};

// GET BY ID
export const getCertificateById = async (req, res) => {

    try {

        const result = await pool.query(
            "SELECT * FROM certificate WHERE id = $1",
            [req.params.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Certificate tidak ditemukan"
            });
        }

        res.status(200).json(result.rows[0]);

    } catch (error) {
        console.error("ERROR:", error.message);

        res.status(500).json({
            message: error.message
        });

    }

};

// CREATE
export const createCertificate = async (req, res) => {
    try {
        const {
            nama,
            penyelenggara,
            tanggal_terbit,
            tanggal_kadaluarsa,
            credential_id,
            credential_url
        } = req.body;

        let gambar = null;
        if (req.file) {
            gambar = req.file.filename;
        }

        const result = await pool.query(
            `
            INSERT INTO certificate
            (nama, penyelenggara, tanggal_terbit, tanggal_kadaluarsa, credential_id, credential_url, gambar)
            VALUES ($1,$2,$3,$4,$5,$6,$7)
            RETURNING *
            `,
            [nama, penyelenggara, tanggal_terbit, tanggal_kadaluarsa, credential_id, credential_url, gambar]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("ERROR:", error.message);
        res.status(500).json({ message: error.message });
    }
};

// UPDATE dengan upload
export const updateCertificate = async (req, res) => {
    try {
        const {
            nama,
            penyelenggara,
            tanggal_terbit,
            tanggal_kadaluarsa,
            credential_id,
            credential_url
        } = req.body;

        let gambar = null;
        
        if (req.file) {
            const oldCert = await pool.query(
                "SELECT gambar FROM certificate WHERE id = $1",
                [req.params.id]
            );
            
            if (oldCert.rows[0]?.gambar) {
                const oldPath = path.join(__dirname, "../uploads/images", oldCert.rows[0].gambar);
                if (fs.existsSync(oldPath)) {
                    fs.unlinkSync(oldPath);
                }
            }
            
            gambar = req.file.filename;
        }

        const result = await pool.query(
            `
            UPDATE certificate
            SET
                nama = $1,
                penyelenggara = $2,
                tanggal_terbit = $3,
                tanggal_kadaluarsa = $4,
                credential_id = $5,
                credential_url = $6,
                gambar = COALESCE($7, gambar),
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $8
            RETURNING *
            `,
            [nama, penyelenggara, tanggal_terbit, tanggal_kadaluarsa, credential_id, credential_url, gambar, req.params.id]
        );

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error("ERROR:", error.message);
        res.status(500).json({ message: error.message });
    }
};

// DELETE - hapus file
export const deleteCertificate = async (req, res) => {
    try {
        const cert = await pool.query(
            "SELECT gambar FROM certificate WHERE id = $1",
            [req.params.id]
        );

        if (cert.rows[0]?.gambar) {
            const filePath = path.join(__dirname, "../uploads/images", cert.rows[0].gambar);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }

        await pool.query("DELETE FROM certificate WHERE id = $1", [req.params.id]);
        res.status(200).json({ message: "Certificate berhasil dihapus" });
    } catch (error) {
        console.error("ERROR:", error.message);
        res.status(500).json({ message: error.message });
    }
};