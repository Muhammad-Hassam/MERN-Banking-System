const { UserModel } = require("../models/User.model");
const ApiError = require("../utils/apiError");
const bcryptjs = require("bcryptjs");
const JWTService = require("../utils/JwtService");

class AuthService {
  static async loginUser(body) {
    const { email, password } = body;
    const check_exist = await UserModel.findOne({ email });
    if (!check_exist) {
      throw new ApiError(400, "No Account Found");
    }
    const isMatch = await bcryptjs.compare(password, check_exist.password);

    if (!isMatch) {
      throw new ApiError(400, "Invalid Credentials");
    }

    return {
      msg: "Login Success",
      token: JWTService.generateToken(check_exist._id)
    };
  }

  static async registerUser(body) {
    const { name, email, password, ac_type } = body;
    const check_exist = await UserModel.findOne({ email: email.toLowerCase() });
    if (check_exist) {
      throw new ApiError(400, "Email Already Exist");
    }
    const user = await UserModel.create({
      name,
      email,
      password,
      ac_type
    });
    return {
      msg: "Register Success",
      token: JWTService.generateToken(user._id)
    };
  }

  static async profileUser(user) {
    const userd = await UserModel.findById(user).select(
      "name email ac_type createdAt -_id"
    );
    if (!userd) {
      throw new ApiError(401, "Profile Not Found");
    }
    return userd;
  }
}

module.exports = AuthService;
