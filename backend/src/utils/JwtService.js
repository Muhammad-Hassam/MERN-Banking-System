const jwt = require("jsonwebtoken");

class JWTService {
  static generateToken(user) {
    const token = jwt.sign({ user }, process.env.JWT_SECRET, {
      algorithm: "HS256",
      expiresIn: "7d"
    });
    return token;
  }
  static ValidateToken(token) {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    return data;
  }
}

module.exports = JWTService;
