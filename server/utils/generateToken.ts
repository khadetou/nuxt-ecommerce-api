import jwt from "jsonwebtoken";
import { H3Event } from "h3";

const generateToken = async (event: H3Event, userId: string | number) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET as string, {
    expiresIn: "1d",
  });

  setCookie(event, "jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60,
    path: "/",
  });

  return token;
};

export default generateToken;
