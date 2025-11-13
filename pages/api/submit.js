export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const payload = req.body;

    // Log the incoming payload for debugging
    console.log("Proxy received payload:", payload);

    const response = await fetch("https://script.google.com/macros/s/AKfycbypdNfj2awbOd_7X4dRre_fQGwkTDp0y-fmkXMjowYSsMm9-tMapG8IH_UcRVP3Ksbl/exec", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const text = await response.text();

    console.log("Google Script response:", text);

    // Return success if the script responded with "Success"
    res.status(200).json({
      created: text.trim() === "Success" ? 1 : 0,
      raw: text
    });
  } catch (error) {
    console.error("Proxy error:", error);
    res.status(500).json({
      error: "Relay failed",
      details: error.message
    });
  }
}
