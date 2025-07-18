const mongoose = require("mongoose");

const pomodoroSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: String, // "YYYY-MM-DD"
    required: true,
  },
  sessions: {
    type: Number,
    default: 1, // Each Pomodoro session = 1 count
  },
  duration: {
    type: Number,
    default: 25, // total minutes of pomodoro sessions for the day
  }
});

pomodoroSchema.index({ userId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("Pomodoro", pomodoroSchema);
