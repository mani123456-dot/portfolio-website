const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Supabase config (YOUR KEYS ADDED)
const supabaseUrl = "https://nxzqmccfzfkkmqosipia.supabase.co";
const supabaseKey = "sb_publishable_9olFveEy58qeJNKcXj0Z4A_n7Lmwi3k";

const supabase = createClient(supabaseUrl, supabaseKey);

// ✅ Test route
app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

// ✅ Contact form API
app.post("/contact", async (req, res) => {
  console.log("Received:", req.body);

  const { name, email, message } = req.body;

  const { error } = await supabase
    .from("messages")
    .insert([{ name, email, message }]);

  if (error) {
    console.error("Supabase error:", error);
    return res.status(500).json({ success: false, error: error.message });
  }

  res.json({ success: true });
});

// ✅ Start server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});

// Removed accidental top-level await query to avoid startup crash.
// If you want to inspect existing messages, use a dedicated route or async function.
