export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'GET') {
    return res.status(200).send('Submit endpoint is live');
  }

  try {
    const buffers = [];
    for await (const chunk of req) {
      buffers.push(chunk);
    }
    const rawBody = Buffer.concat(buffers).toString();
    console.log('Raw body:', rawBody); // ✅ Logging raw body

    const data = JSON.parse(rawBody);
    console.log('Parsed data:', data); // ✅ Logging parsed JSON

    const payload = {
      "Task Name": data.taskName || "",
      "Category": data.category || "",
      "Goal Type": data.goalType || "",
      "Energy Level": data.energyLevel || "",
      "Notes": data.notes || "",
      "Date": data.date || "",
      "Completed?": "FALSE",
      "Created At": new Date().toISOString(),
      "Email Entry": data.emailEntry || ""
    };

    console.log('Payload to SheetDB:', payload); // ✅ Logging final payload

    const response = await fetch('https://sheetdb.io/api/v1/fsuchnwq0m08i', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data: payload })
    });

    const result = await response.json();
    console.log('SheetDB response:', result); // ✅ Logging SheetDB response

    res.status(200).json(result);
  } catch (err) {
    console.error('Proxy error:', err); // ✅ Logging error
    res.status(500).send('Proxy failed');
  }
}
