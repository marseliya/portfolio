import { useState, useEffect } from "react";

export default function MaintenanceBanner() {
  const [status, setStatus] = useState("waking");

  useEffect(() => {
    let cancelled = false;

    // Ping "no-cors" -- tujuannya HANYA memancing server untuk mulai bangun,
    // bukan untuk membaca hasilnya (karena mode no-cors tidak mengizinkan kita
    // membaca response-nya). Ini mengurangi kemungkinan request dibatalkan
    // browser karena alasan CORS sebelum sempat sampai ke server.
    fetch(`${import.meta.env.VITE_API_URL}/`, { mode: "no-cors" }).catch(() => {});

    // Cek status sebenarnya lewat request normal, diulang tiap 5 detik
    const interval = setInterval(() => {
      fetch(`${import.meta.env.VITE_API_URL}/`)
        .then((res) => {
          if (res.ok && !cancelled) {
            setStatus("ready");
            clearInterval(interval);
          }
        })
        .catch(() => {});
    }, 5000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  if (status === "ready") return null;

  return (
    <div style={{
      background: "#dbeafe",
      color: "#1e40af",
      padding: "10px 16px",
      textAlign: "center",
      fontSize: "14px",
    }}>
      ⏳ Server sedang "bangun" dari mode hemat daya (hosting gratis).
      Mohon tunggu sekitar 30–60 detik, data akan otomatis muncul.
    </div>
  );
}