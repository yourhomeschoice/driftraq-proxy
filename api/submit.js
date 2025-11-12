export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    console.log('Incoming data:', req.body); // 🔍 Step 6: log the incoming payload

    const response = await fetch('https://script.google.com/macros/s/AKfycbypdNfj2awbOd_7X4dRre_fQGwkTDp0y-fmkXMjowYSsMm9-tMapG8IH_UcRVP/exec', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams(req.body).toString()
    });

    const text = await response.text();
    res.status(200).send(text);
  } catch (err) {
    console.error('Proxy error:', err);
    res.status(500).send('Proxy failed');
  }
}
