export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const sheetdbUrl = 'https://sheetdb.io/api/v1/YOUR_SHEETDB_ID'; // Replace with your actual SheetDB ID

      console.log('Incoming body:', req.body); // ✅ Log incoming payload

      const response = await fetch(sheetdbUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body)
      });

      const result = await response.json();
      res.status(200).json(result);
    } catch (error) {
      console.error('Proxy error:', error);
      res.status(500).json({ error: 'Proxy failed' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
