const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  days: {
    type: [Boolean], // Array of 7 booleans (Sun to Sat)
    default: [false, false, false, false, false, false, false]
  }
});

module.exports = mongoose.model("Habit", habitSchema);
