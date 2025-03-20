// Import required modules
const express = require('express');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const db = require('./config/db'); // Import database connection
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();
const dotenv = require('dotenv')
//load environment variables
dotenv.config();
// Initialize Express app
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000;
// Set view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(session({
secret: 'your_secret_key', 
resave: false, 
saveUninitialized: true, 
cookie: { secure: false }
}));
// Routes
app.use('/auth', authRoutes);
// Import routes
const indexRoutes = require('./routes/index');
app.use('/', indexRoutes);
// Start server
app.listen(PORT, () => {
console.log(`Server is running on http://localhost:${PORT}`);
});