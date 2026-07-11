import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Tambah di db.js, setelah membuat pool
pool.connect((err, client, release) => {
    if (err) {
        console.error("❌ Gagal konek ke PostgreSQL:", err.message);
        process.exit(1);
    }
    console.log("✅ PostgreSQL terhubung");
    release();
});

export default pool;