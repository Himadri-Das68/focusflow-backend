const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");

// Get todos for a user
router.get("/:userId", async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.params.userId });
    res.json(todos);
  } catch (err) {
    console.error("Fetch Todos Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Add a todo
router.post("/", async (req, res) => {
  const { userId, task, date } = req.body;
  try {
    const newTodo = new Todo({ userId, task, date });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    console.error("Add Todo Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Toggle completion
router.put("/:id", async (req, res) => {
  try {
    const updated = await Todo.findByIdAndUpdate(
      req.params.id,
      { completed: req.body.completed },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    console.error("Update Todo Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete todo
router.delete("/:id", async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Todo deleted" });
  } catch (err) {
    console.error("Delete Todo Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
