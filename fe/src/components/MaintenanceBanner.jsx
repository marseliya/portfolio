import { useState, useEffect } from "react";

export default function MaintenanceBanner() {
  const [status, setStatus] = useState("waking");

  useEffect(() => {
    const controller = new AbortController();

    fetch(`${import.meta.env.VITE_API_URL}/`, { signal: controller.signal })
      .then((res) => {
        if (res.ok) setStatus("ready");
        else setStatus("waking");
      })
      .catch(() => {
        setStatus("waking");
      });

    const interval = setInterval(() => {
      fetch(`${import.meta.env.VITE_API_URL}/`)
        .then((res) => {
          if (res.ok) {
            setStatus("ready");
            clearInterval(interval);
          }
        })
        .catch(() => {});
    }, 5000);

    return () => {
      controller.abort();
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
      Mohon tunggu sekitar 30-60 detik, data akan otomatis muncul. 
      Terima kasih.
    </div>
  );
}