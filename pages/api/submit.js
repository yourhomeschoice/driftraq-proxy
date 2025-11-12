export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const sheetdbUrl = 'https://sheetdb.io/api/v1/YOUR_SHEETDB_ID'; // Replace with your actual SheetDB ID

      const wrapped = { data: [req.body] }; // ✅ Wrap payload for SheetDB
      console.log('Wrapped payload:', wrapped); // Optional: log for debugging

      const response = await fetch(sheetdbUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(wrapped)
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
