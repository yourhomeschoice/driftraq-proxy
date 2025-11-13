import querystring from "querystring";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const payload = {
      taskName: req.body.taskName || "",
      category: req.body.category || "",
      goalType: req.body.goalType || "",
      energyLevel: req.body.energyLevel || "",
      notes: req.body.notes || "",
      date: req.body.date || "",
      emailEntry: req.body.emailEntry || "",
      mood: req.body.mood || "",
      feedbackNotes: req.body.feedbackNotes || "",
      feedbackEmail: req.body.feedbackEmail || "",
      formType: req.body.formType || "feedback"
    };

    console.log("🔍 Proxy Payload:", payload); // ✅ Log before encoding

    const formEncoded = querystring.stringify(payload);

    const response = await fetch("https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formEncoded
    });

    const text = await response.text();
    console.log("🔍 Apps Script Response:", text); // ✅ Log raw response

    res.status(200).json({
      created: text.trim() === "Success" ? 1 : 0,
      raw: text
    });
  } catch (error) {
    console.error("❌ Proxy Error:", error); // ✅ Log error
    res.status(500).json({ error: "Relay failed", details: error.message });
  }
}
    });
  } catch (error) {
    res.status(500).json({ error: "Relay failed", details: error.message });
  }
}
