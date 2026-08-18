import jwt from "jsonwebtoken";
import { ENV } from "./env.js";

export const generateToken = (userId, res) => {
  const { JWT_SECRET } = ENV;
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured");
  }

  const token = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // MS
    httpOnly: true, // prevent XSS attacks: cross-site scripting
    sameSite: ENV.NODE_ENV === "development" ? "strict" : "none", // "none" required for cross-site (Vercel <-> Render) cookies
    secure: ENV.NODE_ENV === "development" ? false : true, // "none" requires secure:true, so this must be true in production
  });

  return token;
};

// http://localhost
// https://dsmakmk.com
