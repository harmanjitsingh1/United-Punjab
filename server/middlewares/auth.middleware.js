import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  try {
    const cookieToken = req.cookies?.token;
    const bearer = req.headers?.authorization || "";
    const headerToken = bearer.startsWith("Bearer ") ? bearer.slice(7) : null;

    let token = (cookieToken || headerToken || "").toString().trim();
    token = token.replace(/^"|"$/g, "");

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized. Please login." });
    }

    const secret = (process.env.JWT_SECRET || "").trim();
    const decoded = jwt.verify(token, secret);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized. Please login." });
    }
    req.user = user.toSafeObject();
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error?.message);

    if (error?.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Session expired. Please login again.",
      });
    }
    return res
      .status(401)
      .json({ success: false, message: "Invalid token. Please login again." });
  }
};
