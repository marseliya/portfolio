import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
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