const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const PORT = 3000;

// ✅ Replace with your actual API key
const genAI = new GoogleGenerativeAI("AIzaSyAp3hbxbmtPefEePdB5X65ZGBS5RL025jk");

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Chat Route
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ reply: 'No message received' });
    }

    // ✅ Correct model name here
    const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-pro-latest" });

    const result = await model.generateContent(message);
    const text = result.response.text();

    res.json({ reply: text });
  } catch (err) {
    console.error("🔥 Error in /api/chat:", err);
    res.status(500).json({ reply: "Something went wrong on the server." });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
