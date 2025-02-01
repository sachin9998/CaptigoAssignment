import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../Models/User.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      return res.status(409).json({
        message: "User is already exist, you can login",
        success: false,
      });
    }

    const userModel = new User({ name, email, password });

    // Encrypt the password before saving to database
    userModel.password = await bcrypt.hash(password, 10);

    // Save user to database
    await userModel.save();

    res.status(201).json({
      message: "User created successfully",
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    // Check if user exist or not
    if (!user) {
      return res.status(404).json({
        message: "User does not exist",
      });
    }

    // Checking password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // Returning if password is not valid
    if (!isPasswordValid) {
      return res.status(403).json({
        message: "Invalid user credentials",
      });
    }

    // Creating JSON Web Token
    const jwtToken = jwt.sign(
      { email: user.email, userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Fetching Logged in user and removing password
    const loggedInUser = await User.findById(user._id).select("-password");

    // Returned Response
    res.status(200).json({
      message: "User logged In Successfully",
      token: jwtToken,
      success: true,
      user: loggedInUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
