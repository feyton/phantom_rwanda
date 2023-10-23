import "dotenv/config";
import * as jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET;

export function decodeAuthHeader(authHeader) {
  const token = authHeader.replace("Bearer ", "");

  if (!token) {
    throw new Error("No token was found");
  }
  try {
    // @ts-ignore
    const data = jwt.verify(token, SECRET);
    return { ...data, userId: data._id, role: data.accessLevel };
  } catch (error) {
    return {};
  }
}

export const context = ({ req }) => {
  const token =
    req && req.headers.authorization
      ? decodeAuthHeader(req.headers.authorization)
      : null;

  return {
    userId: token?._id,
    role: token?.accessLevel,
  };
};
