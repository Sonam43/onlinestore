// --- app.js ---
const express = require('express');
const path = require('path');
const dotenv  =  require('dotenv');
const session = require('express-session');
const db = require('./config/db');
const bodyParser = require('body-parser');

const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/authRoutes');
const homeRoutes = require('./routes/homeRoutes');
const profileRoutes = require('./routes/profileRoutes');
const bookRoutes = require("./routes/bookRoutes");
const adminRoutes = require('./routes/adminRoutes');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'gyeltshenMk',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: 60 * 60 * 1000 // 1 hour
    }
}));

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/components', express.static(path.join(__dirname, 'views/components')));

// Routes (order matters!)
app.use('/', indexRoutes);
app.use('/auth', authRoutes);  // Routes like /auth/login, /auth/signup
app.use('/', homeRoutes);
app.use('/', profileRoutes);
app.use('/', bookRoutes);
app.use('/', adminRoutes);

// DB test route
app.get('/db-test', async (req, res) => {
    try {
        const result = await db.one('SELECT NOW() AS current_time');
        res.json({ message: 'Database connected successfully', time: result.current_time });
    } catch (err) {
        res.status(500).json({ error: 'Database connection failed', details: err.message });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
