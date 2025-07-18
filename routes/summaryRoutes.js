const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");
const Pomodoro = require("../models/Pomodoro");

router.get("/:userId", async (req, res) => {
  const userId = req.params.userId;
  const today = new Date();
  const last7Days = [];

  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    last7Days.push(d.toISOString().split("T")[0]); // "YYYY-MM-DD"
  }

  try {
    const todos = await Todo.find({ userId });
    const pomodoros = await Pomodoro.find({ userId });

    const tasksCompleted = last7Days.map(date =>
      todos.filter(t => t.date === date && t.completed).length
    );

    const tasksTotal = last7Days.map(date =>
      todos.filter(t => t.date === date).length
    );

    const pomodoroDurations = last7Days.map(date => {
      const entry = pomodoros.find(p => p.date === date);
      return entry ? entry.duration : 0; // now using 'duration' field in minutes
    });

    res.json({
      dates: last7Days,
      tasksCompleted,
      tasksTotal,
      pomodoroSessions: pomodoroDurations // frontend still expects this name
    });
  } catch (err) {
    console.error("Summary Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
