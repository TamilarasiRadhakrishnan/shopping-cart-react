import React from "react";
import { THRESHOLD } from "../data";

const ProgressBar = ({ subtotal }) => {
  const progress = Math.min((subtotal / THRESHOLD) * 100, 100);
  const remaining = THRESHOLD - subtotal;

  return (
    <div style={{ marginBottom: "20px" }}>
      <p>
        {subtotal >= THRESHOLD
          ? "🎉 You've unlocked the free gift!"
          : `Add ₹${remaining} more to unlock the free gift`}
      </p>
      <div style={{ background: "#eee", height: "20px", borderRadius: "10px" }}>
        <div
          style={{
            width: `${progress}%`,
            background: "#4caf50",
            height: "100%",
            borderRadius: "10px",
            transition: "width 0.3s ease",
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
