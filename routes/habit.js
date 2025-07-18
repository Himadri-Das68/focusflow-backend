const express = require("express");
const router = express.Router();
const Habit = require("../models/Habit");

// Get all habits for a user
router.get("/:userId", async (req, res) => {
  try {
    const habits = await Habit.find({ userId: req.params.userId });
    res.json(habits);
  } catch (err) {
    res.status(500).json({ message: "Error fetching habits" });
  }
});

// Create a new habit
router.post("/", async (req, res) => {
  const { userId, name, days } = req.body;

  if (!userId || !name || !Array.isArray(days)) {
    return res.status(400).json({ message: "Missing or invalid habit data" });
  }

  try {
    const newHabit = new Habit({ userId, name, days });
    await newHabit.save();
    res.status(201).json(newHabit);
  } catch (err) {
    res.status(500).json({ message: "Error creating habit" });
  }
});

// Update habit days
router.put("/:id", async (req, res) => {
  const { days } = req.body;

  if (!Array.isArray(days) || days.length !== 7) {
    return res.status(400).json({ message: "Invalid days array" });
  }

  try {
    const habit = await Habit.findByIdAndUpdate(
      req.params.id,
      { days },
      { new: true }
    );
    res.json(habit);
  } catch (err) {
    res.status(500).json({ message: "Error updating habit" });
  }
});

// Delete habit
router.delete("/:id", async (req, res) => {
  try {
    await Habit.findByIdAndDelete(req.params.id);
    res.json({ message: "Habit deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting habit" });
  }
});

module.exports = router;
