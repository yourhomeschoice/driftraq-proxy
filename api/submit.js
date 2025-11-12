import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end(); // Preflight response
  }

  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields) => {
    if (err) {
      console.error('Form parse error:', err);
      return res.status(500).send('Form parse failed');
    }

    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbypdNfj2awbOd_7X4dRre_fQGwkTDp0y-fmkXMjowYSsMm9-tMapG8IH_UcRVP3Ksbl/exec', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(fields).toString()
      });

      const text = await response.text();
      res.status(200).send(text);
    } catch (err) {
      console.error('Proxy error:', err);
      res.status(500).send('Proxy failed');
    }
  });
}
