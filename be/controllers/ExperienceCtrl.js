import pool from "../config/db.js";

// GET ALL
export const getExperience = async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM experience ORDER BY id ASC"
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
export const getExperienceById = async (req, res) => {

    try {

        const result = await pool.query(
            "SELECT * FROM experience WHERE id = $1",
            [req.params.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Experience tidak ditemukan"
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
export const createExperience = async (req, res) => {

    try {

        const {
            posisi,
            perusahaan,
            lokasi,
            tipe,
            deskripsi,
            tanggal_mulai,
            tanggal_selesai,
            masih_bekerja
        } = req.body;

        const result = await pool.query(
            `
            INSERT INTO experience
            (
                posisi,
                perusahaan,
                lokasi,
                tipe,
                deskripsi,
                tanggal_mulai,
                tanggal_selesai,
                masih_bekerja
            )
            VALUES
            (
                $1,$2,$3,$4,$5,$6,$7,$8
            )
            RETURNING *
            `,
            [
                posisi,
                perusahaan,
                lokasi,
                tipe,
                deskripsi,
                tanggal_mulai,
                tanggal_selesai,
                masih_bekerja
            ]
        );

        res.status(201).json(result.rows[0]);

    } catch (error) {
        console.error("ERROR:", error.message);

        res.status(500).json({
            message: error.message
        });

    }

};

// UPDATE
export const updateExperience = async (req, res) => {

    try {

        const {
            posisi,
            perusahaan,
            lokasi,
            tipe,
            deskripsi,
            tanggal_mulai,
            tanggal_selesai,
            masih_bekerja
        } = req.body;

        const result = await pool.query(
            `
            UPDATE experience
            SET
            posisi = $1,
            perusahaan = $2,
            lokasi = $3,
            tipe = $4,
            deskripsi = $5,
            tanggal_mulai = $6,
            tanggal_selesai = $7,
            masih_bekerja = $8,
            updated_at = CURRENT_TIMESTAMP
            WHERE id = $9
            RETURNING *
            `,
            [
                posisi,
                perusahaan,
                lokasi,
                tipe,
                deskripsi,
                tanggal_mulai,
                tanggal_selesai,
                masih_bekerja,
                req.params.id
            ]
        );

        res.status(200).json(result.rows[0]);

    } catch (error) {
        console.error("ERROR:", error.message);

        res.status(500).json({
            message: error.message
        });

    }

};

// DELETE
export const deleteExperience = async (req, res) => {

    try {

        await pool.query(
            "DELETE FROM experience WHERE id = $1",
            [req.params.id]
        );

        res.status(200).json({
            message: "Experience berhasil dihapus"
        });

    } catch (error) {
        console.error("ERROR:", error.message);

        res.status(500).json({
            message: error.message
        });

    }

};