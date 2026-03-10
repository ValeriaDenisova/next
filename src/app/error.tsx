"use client";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div
      style={{
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <h1>An error has occurred</h1>
      <p style={{ color: "#555" }}>{error?.message ?? "Unknown error"}</p>
      <button
        onClick={reset}
        style={{
          padding: "0.75rem 1.25rem",
          border: "1px solid #111",
          borderRadius: 8,
          background: "#fff",
          cursor: "pointer",
          marginTop: "20px",
        }}
      >
        Try again
      </button>
    </div>
  );
}
