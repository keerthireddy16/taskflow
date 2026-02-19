const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const config = require('./config/config');

const app = express();
const PORT = config.PORT;

// Middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});
app.use(express.json());
app.use(cookieParser());
const allowedOrigins = [
    'http://localhost:3000',
    'https://taskflow-delta.vercel.app',
    process.env.CLIENT_URL
].filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            console.log('Blocked by CORS:', origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'x-csrf-token'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));
app.use(helmet());

// Database Connection
const connectDB = require('./config/db');
connectDB();

// Routes
app.get('/', (req, res) => {
    res.send('API is running...');
});

app.get('/test', (req, res) => {
    res.send('Test route working');
});

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));

const { errorHandler } = require('./middleware/errorMiddleware');
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
