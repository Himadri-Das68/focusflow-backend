const express = require("express");
const router = express.Router();
const Pomodoro = require("../models/Pomodoro"); // ✅ Make sure this is present!

router.post("/", async (req, res) => {
  const { userId, duration } = req.body;

  if (!userId || !duration) {
    return res.status(400).json({ message: "Missing userId or duration" });
  }

  const today = new Date().toISOString().split("T")[0];

  try {
    const existing = await Pomodoro.findOne({ userId, date: today });

    if (existing) {
      existing.sessions += 1;
      existing.duration += duration; // ✅ Accumulate duration in minutes
      await existing.save();
      return res.status(200).json({ message: "Session incremented", data: existing });
    }

    const newSession = new Pomodoro({ userId, date: today, sessions: 1, duration });
    await newSession.save();
    res.status(201).json({ message: "Session created", data: newSession });

  } catch (err) {
    console.error("Pomodoro Save Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
