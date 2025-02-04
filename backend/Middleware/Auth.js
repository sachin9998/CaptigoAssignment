import jwt from "jsonwebtoken";
import { User } from "../Models/User.js";

export const verifyJWT = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({
      message: "Unauthorised Request",
      success: false,
    });
  }

  try {
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    // console.log("decodedData :", decodedData);

    const user = await User.findById(decodedData?.userId).select("-password");

    // console.log("USER :", user);

    if (!user) {
      return res.status(401).json({
        message: "Invalid Access Token",
        success: false,
      });
    }

    req.user = user;

    // console.log("Verification Started::: ");
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorised Request",
    });
  }
};
