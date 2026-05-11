const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { connectDB } = require('./config/prisma');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// API Test
app.get('/', (req, res) => {
    res.json({ message: 'Backend TaskFlow đang chạy mượt mà!' });
});

// Routes
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.route');
const taskRoutes = require('./routes/task.route');
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/tasks", taskRoutes)

// Khởi động Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
    console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
    await connectDB(); // Gọi hàm test Database
});