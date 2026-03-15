import Link from "next/link";

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "80vh",
        display: "grid",
        placeItems: "center",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <div>
        <h1 style={{ fontSize: "3rem", margin: "0 0 0.75rem" }}>404 — Страница не найдена</h1>
        <p style={{ margin: "0 0 1.5rem", color: "#555" }}>
          Похоже, страница удалена или никогда не существовала.
        </p>
        <Link
          href="/"
          style={{
            display: "inline-block",
            padding: "0.75rem 1.25rem",
            border: "1px solid #111",
            borderRadius: 8,
            textDecoration: "none",
            color: "#111",
            background: "#fff",
          }}
        >
          Вернуться на главную
        </Link>
      </div>
    </main>
  );
}
