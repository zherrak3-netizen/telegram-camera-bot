
const express = require("express");
const multer = require("multer");
const axios = require("axios");

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.use(express.json());

app.post("/send-photo", upload.single("photo"), async (req, res) => {
  try {
    const token = process.env.BOT_TOKEN;
    const chatId = process.env.CHAT_ID;

    const form = new FormData();
    form.append("chat_id", chatId);
    form.append("photo", new Blob([req.file.buffer]), "photo.jpg");

    const response = await fetch(
      `https://api.telegram.org/bot${token}/sendPhoto`,
      {
        method: "POST",
        body: form
      }
    );

    const result = await response.json();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to send photo" });
  }
});

app.get("/", (req, res) => {
  res.send("Telegram Camera Bot is running!");
});

app.listen(process.env.PORT || 3000);
