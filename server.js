const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables from .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// ✅ CORS Configuration
app.use(cors({
  origin: [
    'http://127.0.0.1:5500',
    'http://localhost:5500',
    'https://focusflow-frontend-614j.onrender.com'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

// Parse JSON bodies
app.use(express.json());

// Import routes
const authRoutes = require('./routes/auth');
const todoRoutes = require('./routes/todo');
const habitRoutes = require('./routes/habit');
const pomodoroRoutes = require('./routes/pomodoro');
const summaryRoutes = require('./routes/summaryRoutes');

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);
app.use('/api/habits', habitRoutes);
app.use('/api/pomodoros', pomodoroRoutes);
app.use('/api/summary', summaryRoutes);

// Root health check
app.get('/', (req, res) => {
  res.send('🌟 FocusFlow Server is up and running!');
});

// Connect to MongoDB Atlas
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB Atlas'))
.catch((err) => console.error('❌ MongoDB connection error:', err.message));

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
