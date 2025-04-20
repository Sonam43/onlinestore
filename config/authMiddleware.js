// Middleware to check if user is authenticated
function isAuthenticated(req, res, next) {
    // Check if the session has the user object set
    if (req.session && req.session.user) {
      return next();  // User is authenticated, continue to the next route
    } else {
      res.redirect('/login');  // Redirect to login if not authenticated
    }
  }
  
  module.exports = { isAuthenticated };
  