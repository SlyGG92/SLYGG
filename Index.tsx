// pages/index.tsx
import { useState } from 'react';

export default function Home() {
  const [cvText, setCvText] = useState('');
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    const res = await fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: cvText })
    });
    const data = await res.json();
    setReport(data.result);
    setLoading(false);
  };

  return (
    <main style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
        CV Checker & Online Report Bot
      </h1>
      <textarea
        style={{ width: '100%', height: '200px', padding: '10px', marginBottom: '20px', borderRadius: '8px', border: '1px solid #ccc' }}
        placeholder="Paste CV text here..."
        value={cvText}
        onChange={(e) => setCvText(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{ padding: '10px 20px', borderRadius: '6px', backgroundColor: '#0070f3', color: '#fff', border: 'none', cursor: 'pointer' }}
      >
        {loading ? 'Analyzing...' : 'Submit'}
      </button>
      {report && (
        <div style={{ marginTop: '30px', padding: '20px', border: '1px solid #eee', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{report}</pre>
        </div>
      )}
    </main>
  );
}
