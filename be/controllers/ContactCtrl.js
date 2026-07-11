import pool from "../config/db.js";

// GET ALL
export const getAllMessages = async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM contact_message ORDER BY created_at DESC"
        );
        res.status(200).json(result.rows);
    } catch (error) {
        console.error("ERROR:", error.message);
        res.status(500).json({ message: error.message });
    }
};

// GET BY ID
export const getMessageById = async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM contact_message WHERE id = $1",
            [req.params.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Pesan tidak ditemukan" });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error("ERROR:", error.message);
        res.status(500).json({ message: error.message });
    }
};

// GET UNREAD ONLY
export const getUnreadMessages = async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM contact_message WHERE sudah_dibaca = FALSE ORDER BY created_at DESC"
        );
        res.status(200).json(result.rows);
    } catch (error) {
        console.error("ERROR:", error.message);
        res.status(500).json({ message: error.message });
    }
};

// CREATE (kirim pesan baru dari form contact)
export const createMessage = async (req, res) => {
    try {
        const { nama, email, subjek, pesan } = req.body;

        const result = await pool.query(
            `INSERT INTO contact_message (nama, email, subjek, pesan)
             VALUES ($1, $2, $3, $4)
             RETURNING *`,
            [nama, email, subjek, pesan]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("ERROR:", error.message);
        res.status(500).json({ message: error.message });
    }
};

// MARK AS READ — tandai 1 pesan sudah dibaca
export const markAsRead = async (req, res) => {
    try {
        const result = await pool.query(
            `UPDATE contact_message
             SET sudah_dibaca = TRUE
             WHERE id = $1
             RETURNING *`,
            [req.params.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Pesan tidak ditemukan" });
        }

        res.status(200).json({
            message: "Pesan ditandai sudah dibaca",
            data: result.rows[0]
        });
    } catch (error) {
        console.error("ERROR:", error.message);
        res.status(500).json({ message: error.message });
    }
};

// MARK AS UNREAD — kalau mau tandai belum dibaca lagi
export const markAsUnread = async (req, res) => {
    try {
        const result = await pool.query(
            `UPDATE contact_message
             SET sudah_dibaca = FALSE
             WHERE id = $1
             RETURNING *`,
            [req.params.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Pesan tidak ditemukan" });
        }

        res.status(200).json({
            message: "Pesan ditandai belum dibaca",
            data: result.rows[0]
        });
    } catch (error) {
        console.error("ERROR:", error.message);
        res.status(500).json({ message: error.message });
    }
};

// MARK ALL AS READ — tandai semua pesan sudah dibaca sekaligus
export const markAllAsRead = async (req, res) => {
    try {
        const result = await pool.query(
            `UPDATE contact_message
             SET sudah_dibaca = TRUE
             WHERE sudah_dibaca = FALSE
             RETURNING *`
        );

        res.status(200).json({
            message: `${result.rowCount} pesan ditandai sudah dibaca`,
            data: result.rows
        });
    } catch (error) {
        console.error("ERROR:", error.message);
        res.status(500).json({ message: error.message });
    }
};

// DELETE
export const deleteMessage = async (req, res) => {
    try {
        const result = await pool.query(
            "DELETE FROM contact_message WHERE id = $1 RETURNING *",
            [req.params.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Pesan tidak ditemukan" });
        }

        res.status(200).json({ message: "Pesan berhasil dihapus" });
    } catch (error) {
        console.error("ERROR:", error.message);
        res.status(500).json({ message: error.message });
    }
};