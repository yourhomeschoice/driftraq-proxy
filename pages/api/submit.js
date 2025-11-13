export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const formData = new URLSearchParams();

    for (const key in req.body) {
      if (req.body.hasOwnProperty(key)) {
        formData.append(key, req.body[key]);
      }
    }

    const response = await fetch("https://script.google.com/macros/s/AKfycbypdNfj2awbOd_7X4dRre_fQGwkTDp0y-fmkXMjowYSsMm9-tMapG8IH_UcRVP3Ksbl/exec", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: formData.toString()
    });

    const text = await response.text();
    res.status(200).json({ created: text.trim() === "Success" ? 1 : 0, raw: text });
  } catch (error) {
    res.status(500).json({ error: "Relay failed", details: error.message });
  }
}
