-- Jalankan tiap query ini satu-satu di terminal psql (connect ke Supabase),
-- output-nya langsung berupa teks JSON yang bisa di-copy ke file .json

\t
\a

\o profile.json
SELECT json_agg(row_to_json(t)) FROM (SELECT * FROM profile) t;
\o

\o education.json
SELECT json_agg(row_to_json(t)) FROM (SELECT * FROM education ORDER BY tanggal_mulai DESC) t;
\o

\o experience.json
SELECT json_agg(row_to_json(t)) FROM (SELECT * FROM experience ORDER BY tanggal_mulai DESC) t;
\o

\o project.json
SELECT json_agg(row_to_json(t)) FROM (SELECT * FROM project) t;
\o

\o certificate.json
SELECT json_agg(row_to_json(t)) FROM (SELECT * FROM certificate) t;
\o

\o skills.json
SELECT json_agg(row_to_json(t)) FROM (SELECT * FROM skills) t;
\o