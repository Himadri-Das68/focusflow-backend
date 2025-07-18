const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// ✅ Fixed CORS origin to match frontend URL exactly (127.0.0.1 instead of localhost)
app.use(cors({
  origin: ['http://127.0.0.1:5500', 'http://localhost:5500'], // allow both
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

// Middleware to parse JSON bodies
app.use(express.json());

// Import routes
const authRoutes = require('./routes/auth');       // Login & Signup
const todoRoutes = require('./routes/todo');
const habitRoutes = require('./routes/habit');
const pomodoroRoutes = require('./routes/pomodoro');
const summaryRoutes = require('./routes/summaryRoutes');

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);
app.use('/api/habits', habitRoutes);
app.use('/api/pomodoros', pomodoroRoutes);
app.use('/api/summary', summaryRoutes);

// Health check route
app.get('/', (req, res) => {
  res.send('🌟 FocusFlow Server is up and running!');
});

// Connect to MongoDB Atlas
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connected to MongoDB Atlas');
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err.message);
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
