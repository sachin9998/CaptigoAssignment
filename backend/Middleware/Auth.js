import jwt from "jsonwebtoken";
import { User } from "../Models/User";

export const verifyJWT = async (req, res) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({
      message: "Unauthorised Request",
      success: false,
    });
  }

  try {
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    console.log("decodedData :", decodedData);

    const user = await User.findById(decodedToken?._id).select("-password");

    if (!user) {
      return res.status(401).json({
        message: "Invalid Access Token",
        success: false,
      });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorised Request",
    });
  }
};
