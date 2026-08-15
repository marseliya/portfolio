import { useState } from "react";

export default function MaintenanceBanner() {
  const [dismissed, setDismissed] = useState(false);
  const isMaintenanceMode = import.meta.env.VITE_MAINTENANCE_MODE === "true";

  if (!isMaintenanceMode || dismissed) return null;

  return (
    <div style={{
      background: "#fef3c7",
      color: "#92400e",
      padding: "10px 16px",
      textAlign: "center",
      fontSize: "14px",
      position: "relative",
    }}>
      🔧 Website sedang dalam maintenance, beberapa fitur mungkin belum berfungsi normal.
      <button
        onClick={() => setDismissed(true)}
        style={{ position: "absolute", right: "12px", top: "8px", background: "none", border: "none", cursor: "pointer" }}
      >
        ✕
      </button>
    </div>
  );
}