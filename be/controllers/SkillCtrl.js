import pool from "../config/db.js";

// GET ALL SKILLS BY PROFILE
export const getSkillsByProfile = async (req, res) => {
    try {
        const { profileId } = req.params;

        const result = await pool.query(
            `SELECT * FROM skills WHERE profile_id = $1 ORDER BY id ASC`,
            [profileId]
        );

        res.status(200).json(result.rows);
    } catch (error) {
        console.error("ERROR:", error.message);
        res.status(500).json({ message: error.message });
    }
};

// GET SKILL BY ID
export const getSkillById = async (req, res) => {
    try {
        const { profileId, id } = req.params;

        const result = await pool.query(
            `SELECT * FROM skills WHERE id = $1 AND profile_id = $2`,
            [id, profileId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Skill tidak ditemukan" });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error("ERROR:", error.message);
        res.status(500).json({ message: error.message });
    }
};

// CREATE
export const createSkill = async (req, res) => {
    try {
        const { profileId } = req.params;
        const { nama_skill } = req.body;

        // cek profile ada atau tidak
        const profile = await pool.query(
            "SELECT id FROM profile WHERE id = $1",
            [profileId]
        );
        if (profile.rows.length === 0) {
            return res.status(404).json({ message: "Profile tidak ditemukan" });
        }

        const result = await pool.query(
            `INSERT INTO skills (profile_id, nama_skill)
             VALUES ($1, $2)
             RETURNING *`,
            [profileId, nama_skill]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("ERROR:", error.message);
        res.status(500).json({ message: error.message });
    }
};

// CREATE MANY — insert banyak skill sekaligus
export const createManySkills = async (req, res) => {
    try {
        const { profileId } = req.params;
        const { skills } = req.body; // array: ["JavaScript", "React", "Node.js"]

        if (!Array.isArray(skills) || skills.length === 0) {
            return res.status(400).json({ message: "Skills harus berupa array dan tidak boleh kosong" });
        }

        // cek profile ada atau tidak
        const profile = await pool.query(
            "SELECT id FROM profile WHERE id = $1",
            [profileId]
        );
        if (profile.rows.length === 0) {
            return res.status(404).json({ message: "Profile tidak ditemukan" });
        }

        // build query dinamis: ($1,$2),($1,$3),($1,$4)...
        const values = [];
        const placeholders = skills.map((skill, i) => {
            values.push(profileId, skill);
            return `($${i * 2 + 1}, $${i * 2 + 2})`;
        });

        const result = await pool.query(
            `INSERT INTO skills (profile_id, nama_skill)
             VALUES ${placeholders.join(", ")}
             RETURNING *`,
            values
        );

        res.status(201).json(result.rows);
    } catch (error) {
        console.error("ERROR:", error.message);
        res.status(500).json({ message: error.message });
    }
};

// UPDATE
export const updateSkill = async (req, res) => {
    try {
        const { profileId, id } = req.params;
        const { nama_skill } = req.body;

        const result = await pool.query(
            `UPDATE skills
             SET nama_skill = $1
             WHERE id = $2 AND profile_id = $3
             RETURNING *`,
            [nama_skill, id, profileId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Skill tidak ditemukan" });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error("ERROR:", error.message);
        res.status(500).json({ message: error.message });
    }
};

// DELETE
export const deleteSkill = async (req, res) => {
    try {
        const { profileId, id } = req.params;

        const result = await pool.query(
            `DELETE FROM skills WHERE id = $1 AND profile_id = $2 RETURNING *`,
            [id, profileId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Skill tidak ditemukan" });
        }

        res.status(200).json({ message: "Skill berhasil dihapus" });
    } catch (error) {
        console.error("ERROR:", error.message);
        res.status(500).json({ message: error.message });
    }
};

// DELETE ALL SKILLS BY PROFILE
export const deleteAllSkills = async (req, res) => {
    try {
        const { profileId } = req.params;

        const result = await pool.query(
            `DELETE FROM skills WHERE profile_id = $1`,
            [profileId]
        );

        res.status(200).json({ message: `${result.rowCount} skill berhasil dihapus` });
    } catch (error) {
        console.error("ERROR:", error.message);
        res.status(500).json({ message: error.message });
    }
};