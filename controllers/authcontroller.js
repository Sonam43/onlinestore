// Import necessary modules (like bcrypt, db, etc.)
const bcrypt = require("bcryptjs");
const db = require("../config/db"); // Adjust the path if needed

// Register User
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Implement your registration logic
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error registering user", details: err.message });
  }
};

// Login User
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const adminEmail = process.env.ADMIN_EMAIL;

  try {
    const user = await db.oneOrNone('SELECT * FROM users WHERE email = $1', [email]);

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    req.session.user = {
      id: user.id,
      name: user.name,
      email: user.email
    };

    // Redirect based on role
    if (user.email === adminEmail) {
      return res.redirect('/admin/dashboard');
    }
    
    res.redirect('/home');
    
  } catch (err) {
    res.status(500).json({ error: 'Error logging in', details: err.message });
  }
};

// Logout User
exports.logoutUser = (req, res) => {
  try {
    req.session.destroy(() => {
      res.redirect("/auth/login");
    });
  } catch (err) {
    res.status(500).json({ error: "Error logging out", details: err.message });
  }
};
