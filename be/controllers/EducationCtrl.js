import pool from "../config/db.js";

// GET ALL
export const getEducation = async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM education ORDER BY id ASC"
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
export const getEducationById = async (req, res) => {

    try {

        const result = await pool.query(
            "SELECT * FROM education WHERE id = $1",
            [req.params.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Education tidak ditemukan"
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
export const createEducation = async (req, res) => {

    try {

        const {
            institusi,
            jurusan,
            jenjang,
            deskripsi,
            tanggal_mulai,
            tanggal_selesai,
            ipk
        } = req.body;

        const result = await pool.query(
            `
            INSERT INTO education
            (
                institusi,
                jurusan,
                jenjang,
                deskripsi,
                tanggal_mulai,
                tanggal_selesai,
                ipk
            )
            VALUES
            (
                $1,$2,$3,$4,$5,$6,$7
            )
            RETURNING *
            `,
            [
                institusi,
                jurusan,
                jenjang,
                deskripsi,
                tanggal_mulai,
                tanggal_selesai,
                ipk
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
export const updateEducation = async (req, res) => {

    try {

        const {
            institusi,
            jurusan,
            jenjang,
            deskripsi,
            tanggal_mulai,
            tanggal_selesai,
            ipk
        } = req.body;

        const result = await pool.query(
            `
            UPDATE education
            SET
            institusi = $1,
            jurusan = $2,
            jenjang = $3,
            deskripsi = $4,
            tanggal_mulai = $5,
            tanggal_selesai = $6,
            ipk = $7,
            updated_at = CURRENT_TIMESTAMP
            WHERE id = $8
            RETURNING *
            `,
            [
                institusi,
                jurusan,
                jenjang,
                deskripsi,
                tanggal_mulai,
                tanggal_selesai,
                ipk,
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
export const deleteEducation = async (req, res) => {

    try {

        await pool.query(
            "DELETE FROM education WHERE id = $1",
            [req.params.id]
        );

        res.status(200).json({
            message: "Education berhasil dihapus"
        });

    } catch (error) {
        console.error("ERROR:", error.message);

        res.status(500).json({
            message: error.message
        });

    }

};