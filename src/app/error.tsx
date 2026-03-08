'use client';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <html lang="en">
      <body>
        <h1>Произошла ошибка</h1>
        <p style={{ color: '#555' }}>{error?.message ?? 'Неизвестная ошибка'}</p>
        <button
          onClick={reset}
          style={{
            padding: '0.75rem 1.25rem',
            border: '1px solid #111',
            borderRadius: 8,
            background: '#fff',
            cursor: 'pointer',
          }}
        >
          Попробовать снова
        </button>
      </body>
    </html>
  );
}